import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { findById, listAuthors } from "../services/author.service";

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

export const authorDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author delete: ${req.params.id}`);
  }
);

export const authorCreatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: Author create");
  }
);

export const authorCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: Author create");
  }
);

export const authorDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: Author delete");
  }
);
