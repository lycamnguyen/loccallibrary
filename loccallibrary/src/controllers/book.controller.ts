import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createBook,
  deleteById,
  findBook,
  findById,
  numberOfBooks,
  updateBook,
} from "../services/book.service";
import { listAuthors, numberOfAuthors } from "../services/author.service";
import {
  availableBookInstances,
  numberOfBookInstances,
} from "../services/bookInstance.service";
import {
  findGenres,
  listGenres,
  numberOfGenres,
} from "../services/genre.service";
import { body, validationResult } from "express-validator";
import { Book } from "../entity/book.entity";
import { t } from "i18next";
import validateCreate from "./validateCreate";

export const bookList = asyncHandler(async (req: Request, res: Response) => {
  const books = await findBook();
  res.render("books/book", { books, title: "List of books" });
});

export const bookDetail = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { t } = req;
  res.locals.currentPath = "/books" + req.path;
  if (isNaN(id)) {
    return res.render("./error", {
      error: {
        status: 404,
        message: t("book.error_message_invalid"),
      },
    });
  }
  const book = await findById(id);

  if (book === null) {
    return res.render("./error", {
      error: {
        status: 404,
        message: t("book.error_message_not_found"),
      },
    });
  }
  return res.render("books/detail", {
    book,
    bookInstances: book?.bookInstances,
    bookGenres: book?.genres,
  });
});

export const bookUpdateGet = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { t } = req;
    res.locals.currentPath = "/books" + req.path;
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("book.error_message_invalid"),
        },
      });
    }
    const [book, allAuthors, allGenres] = await Promise.all([
      findById(id),
      listAuthors(),
      listGenres(),
    ]);
    res.render("books/update", {
      title: "Update Book",
      authors: allAuthors,
      genres: allGenres,
      book: book,
    });
  }
);

export const bookUpdatePost = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  body("title", t("Title must not be empty."))
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", t("Author must not be empty."))
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", t("Summary must not be empty."))
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre").custom((value) => {
    if (!Array.isArray(value) || value.length === 0) {
      throw new Error("At least one genre must be selected.");
    }
    return true;
  }),

  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres, oldBook] = await Promise.all([
        listAuthors(),
        listGenres(),
        findById(id),
      ]);
      return res.render(`books/update`, {
        title: "Update Book",
        authors: allAuthors,
        genres: allGenres,
        book: oldBook,
        errors: errors.array(),
      });
    }

    const listId = req.body.genre.map((item: string) => parseInt(item));
    const genres = await findGenres(listId);

    const book = new Book();
    book.id = id;
    book.title = req.body.title;
    book.author = req.body.author;
    book.summary = req.body.summary;
    book.isbn = req.body.isbn;
    book.genres = genres;

    const updated = await updateBook(book);

    res.redirect(`/books/${updated.id}/detail`);
  }),
];

export const bookCreatePost = [
  ...validateCreate("book"),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await Promise.all([
        listAuthors(),
        listGenres(),
      ]);
      return res.render(`books/create`, {
        title: "Create new book",
        authors: allAuthors,
        genres: allGenres,
        errors: errors.array(),
      });
    }

    const listId = req.body.genre.map((item: string) => parseInt(item));
    const genres = await findGenres(listId);

    const book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.summary = req.body.summary;
    book.isbn = req.body.isbn;
    book.genres = genres;

    const created = await createBook(book);

    res.redirect(`/books/${created.id}/detail`);
  }),
];

export const bookCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    const [allAuthors, allGenres] = await Promise.all([
      listAuthors(),
      listGenres(),
    ]);
    res.render("books/create", {
      title: "Create new book",
      authors: allAuthors,
      genres: allGenres,
    });
  }
);

export const bookDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await findById(id);
    const bookInstances = book?.bookInstances || [];
    console.log(book);
    console.log(bookInstances);
    return res.render(`books/delete`, { book, bookInstances: bookInstances });
  }
);

export const bookDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.render("./error", {
        error: {
          status: 404,
          message: t("book.error_message_invalid"),
        },
      });
    }
    const book = await findById(id);
    if (book === null) {
      res.redirect("/books/book");
    }

    const bookInstances = book?.bookInstances;

    if (bookInstances.length > 0) {
      res.render("books/delete", {
        title: "Delete Book",
        author: book,
        bookInstances: bookInstances,
      });
      return;
    } else {
      await deleteById(id);
    }

    const books = await findBook();
    return res.render("books/book", { books });
  }
);

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
