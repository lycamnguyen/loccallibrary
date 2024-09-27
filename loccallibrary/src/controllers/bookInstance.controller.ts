import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { findById, listBookInstances } from "../services/bookInstance.service";

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

export const bookInstanceDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: bookInstance delete: ${req.params.id}`);
  }
);

export const bookInstanceCreatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: bookInstance create");
  }
);

export const bookInstanceCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: bookInstance create");
  }
);

export const bookInstanceDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: bookInstance delete");
  }
);
