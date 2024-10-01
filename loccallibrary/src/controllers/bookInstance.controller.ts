import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createBookinstance,
  deleteById,
  findById,
  listBookInstances,
} from "../services/bookInstance.service";
import { findBook } from "../services/book.service";
import { validationResult } from "express-validator";
import { t } from "i18next";
import { BookInstance } from "../entity/bookInstance.entity";
import validateCreate from "./validateCreate";

// Display list of all bookInstances.
export const bookInstanceList = asyncHandler(
  async (req: Request, res: Response) => {
    const bookInstances = await listBookInstances();
    res.render("bookinstances/bookinstance", {
      bookInstances,
    });
  }
);

// Display detail page for a specific bookInstance.
export const bookInstanceDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { t } = req;
    res.locals.currentPath = "/bookinstances" + req.path;
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("bookinstance.error_message_invalid"),
        },
      });
    }
    const bookInstance = await findById(id);
    if (bookInstance === null) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("bookinstance.error_message_not_found"),
        },
      });
    }
    return res.render("bookInstances/detail", {
      bookInstance,
    });
  }
);

// Do the same with other actions Update, Delete, Create
export const bookInstanceUpdateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: bookInstance update: ${req.params.id}`);
  }
);

export const bookInstanceUpdatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: bookInstance update: ${req.params.id}`);
  }
);

export const bookInstanceCreatePost = [
  ...validateCreate("bookInstance"),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const books = await findBook();
      return res.render(`bookinstances/create`, {
        title: "Create new book instance",
        books,
        errors: errors.array(),
      });
    }
    const bookinstance = new BookInstance();
    bookinstance.book = req.body.book;
    bookinstance.imprint = req.body.imprint;
    bookinstance.status = req.body.status;
    bookinstance.due_back = req.body.due_back;
    const created = await createBookinstance(bookinstance);
    res.redirect(`/bookinstances/${created.id}/detail`);
  }),
];

export const bookInstanceCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    const books = await findBook();
    console.log(books);
    return res.render("bookinstances/create", { books });
  }
);

export const bookInstanceDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const bookInstance = await findById(id);
    res.render("bookinstances/delete", { bookInstance });
  }
);

export const bookInstanceDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("bookinstance.error_message_invalid"),
        },
      });
    }
    const bookInstance = await findById(id);
    if (bookInstance === null) {
      res.redirect("/bookInstances/bookinstance");
    }

    await deleteById(id);

    const bookInstances = await listBookInstances();
    return res.render("bookInstances/bookinstance", { bookInstances });
  }
);
