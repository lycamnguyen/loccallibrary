import { AppDataSource } from "../config/data-source";
import { Book } from "../entity/book.entity";

const bookRepository = AppDataSource.getRepository(Book);

export const findBook = async () => {
  const books = await bookRepository.find({
    order: { title: "ASC" },
    relations: ["author"],
  });
  return books;
};

export const numberOfBooks = async () => {
  const books = await bookRepository.count();

  return books;
};
