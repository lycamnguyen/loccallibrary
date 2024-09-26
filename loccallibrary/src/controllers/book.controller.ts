import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { findBook, numberOfBooks } from "../services/book.service";
import { numberOfAuthors } from "../services/author.service";
import {
  availableBookInstances,
  numberOfBookInstances,
} from "../services/bookInstance.service";
import { numberOfGenres } from "../services/genre.service";

// Display list of all books.
//p5
export const bookList = asyncHandler(async (req: Request, res: Response) => {
  const books = await findBook();
  res.render("books/list", { books, title: "List of books" });
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

//p4
export const index = asyncHandler(async (req: Request, res: Response) => {
  const books = await numberOfBooks();
  const authors = await numberOfAuthors();
  const bookInstances = await numberOfBookInstances();
  const availBookInstances = await availableBookInstances();
  const genres = await numberOfGenres();
  res.render("index", {
    title: "Local library home",
    book_count: books,
    book_instance_count: bookInstances,
    book_instance_available_count: availBookInstances.length,
    author_count: authors,
    genre_count: genres,
  });
});
