import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { findById, listGenres } from "../services/genre.service";

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
    res.send(`NOT IMPLEMENTED: genre delete: ${req.params.id}`);
  }
);

export const genreCreatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: genre create");
  }
);

export const genreCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: genre create");
  }
);

export const genreDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: genre delete");
  }
);
