import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Display list of all books.
export const bookList = asyncHandler(async (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: book list");
});

// Display detail page for a specific book.
export const bookDetail = asyncHandler(async (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: book detail: ${req.params.id}`);
});

// Do the same with other actions Update, Delete, Create
export const bookUpdateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: book update: ${req.params.id}`);
  }
);

export const bookUpdatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: book update: ${req.params.id}`);
  }
);

export const bookDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: book delete: ${req.params.id}`);
  }
);

export const bookCreatePost = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: book create");
  }
);

export const bookCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: book create");
  }
);

export const bookDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED: book delete");
  }
);
