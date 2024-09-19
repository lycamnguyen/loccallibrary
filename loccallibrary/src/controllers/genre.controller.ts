import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Display list of all genres.
export const genreList = asyncHandler(async (req: Request, res: Response) => {
  res.send("NOT IMPLEMENTED: genre list");
});

// Display detail page for a specific genre.
export const genreDetail = asyncHandler(async (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: genre detail: ${req.params.id}`);
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
