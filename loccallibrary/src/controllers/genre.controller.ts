import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createGenre,
  deleteById,
  findById,
  findByName,
  listGenres,
} from "../services/genre.service";
import { Result, validationResult } from "express-validator";
import { Genre } from "../entity/genre.entity";
import { t } from "i18next";
import validateCreate from "./validateCreate";

// Display list of all genres.
export const genreList = asyncHandler(async (req: Request, res: Response) => {
  const genres = await listGenres();
  res.render("genres/genre", { genres });
});

// Display detail page for a specific genre.
export const genreDetail = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { t } = req;
  res.locals.currentPath = "/genres" + req.path;
  if (isNaN(id)) {
    return res.render("./error", {
      error: {
        status: 404,
        message: t("genre.error_message_invalid"),
      },
    });
  }
  const genre = await findById(id);
  if (genre === null) {
    return res.render("./error", {
      error: {
        status: 404,
        message: t("genre.error_message_not_found"),
      },
    });
  }
  return res.render("genres/detail", {
    genre: genre,
    books: genre?.books,
  });
});

export const genreCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.render("genres/create", { title: "Create New Genre" });
  }
);

export const genreCreatePost = [
  ...validateCreate("genre"),
  asyncHandler(async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    const genre = new Genre();
    genre.name = req.body.name;

    if (!errors.isEmpty()) {
      res.render("genres/create", {
        title: "Create New Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      const genreExists = await findByName(req.body.name);
      console.log(req.body.name);
      if (genreExists) {
        res.redirect(`/genres/${genreExists.id}/detail`);
      } else {
        const newGenre = await createGenre(req.body.name);
        res.redirect(`/genres/${newGenre.id}/detail`);
      }
    }
  }),
];

// Do the same with other actions Update, Delete, Create
export const genreUpdateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: genre update: ${req.params.id}`);
  }
);

export const genreUpdatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: genre update: ${req.params.id}`);
  }
);

export const genreDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("genre.error_message_invalid"),
        },
      });
    }
    // Get details of author and all their books
    const genre = await findById(id);
    if (genre === null) {
      res.redirect("/books/book"); // No results.
    }

    const books = genre?.books;

    if (books.length > 0) {
      // Author has books. Render in same way as for GET route.
      res.render("genre/delete", {
        title: "Delete Genre",
        genre: genre,
        books,
      });
      return;
    } else {
      await deleteById(id); // Author has no books. Delete object and redirect to the list of authors.
    }

    const genres = await listGenres();
    return res.render("genres/genre", { genres });
  }
);

export const genreDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const genre = await findById(id);
    const books = genre?.books;

    return res.render(`genres/delete`, { genre, books });
  }
);
