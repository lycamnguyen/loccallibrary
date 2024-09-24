import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: Author list");
});

// Display detail page for a specific Author.
export const authorDetail = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
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
