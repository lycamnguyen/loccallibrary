import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { listBookInstances } from "../services/bookInstance.service";

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
    res.send(`NOT IMPLEMENTED: bookInstance detail: ${req.params.id}`);
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
