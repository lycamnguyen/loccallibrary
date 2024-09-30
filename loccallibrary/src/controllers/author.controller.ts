import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createAuthor,
  deleteById,
  findById,
  isExists,
  listAuthors,
} from "../services/author.service";
import { Result, validationResult } from "express-validator";
import { Author } from "../entity/author.entity";
import { t } from "i18next";
import validateCreate from "./validateCreate";

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response) => {
  const authors = await listAuthors();
  res.render("authors/author", { authors });
});
// Display detail page for a specific Author.
export const authorDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { t } = req;
    res.locals.currentPath = "/authors" + req.path;
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("author.error_message_invalid"),
        },
      });
    }
    const author = await findById(id);

    if (author === null) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("author.error_message_not_found"),
        },
      });
    }
    return res.render("authors/detail", {
      author,
      books: author?.books,
    });
  }
);

// Do the same with other actions Update, Delete, Create
export const authorUpdateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author update: ${req.params.id}`);
  }
);

export const authorUpdatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author update: ${req.params.id}`);
  }
);

export const authorDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { t } = req;
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("author.error_message_invalid"),
        },
      });
    }
    const author = await findById(id);
    if (author === null) {
      res.redirect("/authors/author");
    }
    const allBooksByAuthor = author?.books;
    res.render("authors/delete", {
      title: "Delete Author",
      author: author,
      books: allBooksByAuthor,
    });
  }
);

export const authorDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("author.error_message_invalid"),
        },
      });
    }

    const author = await findById(id);
    if (author === null) {
      res.redirect("/authors");
    }

    const allBooksByAuthor = author?.books;

    if (allBooksByAuthor.length > 0) {
      res.render("authors/delete", {
        title: "Delete Author",
        author: author,
        authorBooks: allBooksByAuthor,
      });
      return;
    } else {
      await deleteById(id);
      res.redirect("/authors/list");
    }

    const authors = await listAuthors();
    return res.render("authors/author", { authors });
  }
);

export const authorCreatePost = [
  ...validateCreate("author"),
  asyncHandler(async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    const author = new Author();
    author.firstName = req.body.firstName;
    author.familyName = req.body.familyName;
    author.dateOfBirth = req.body.dateOfBirth;
    author.dateOfDeath = req.body.dateOfDeath;
    const lang = req.query.lang;

    let redirectUrl = "authors/create";
    if (lang) {
      redirectUrl += `?lang=${lang}`;
    }
    console.log(redirectUrl);
    if (!errors.isEmpty()) {
      res.render(redirectUrl, {
        title: "Create New Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else {
      const authorExists = await isExists(author);
      console.log(req.body.name);
      if (authorExists) {
        res.redirect(`/authors/${authorExists.id}/detail`);
      } else {
        const newAuthor = await createAuthor(author);
        res.redirect(`/authors/${newAuthor.id}/detail`);
      }
    }
  }),
];

export const authorCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    return res.render("authors/create");
  }
);
