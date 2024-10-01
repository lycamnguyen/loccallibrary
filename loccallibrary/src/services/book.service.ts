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

export const findById = async (id) => {
  return await bookRepository.findOne({
    relations: ["author", "genres", "bookInstances"],
    where: { id: id },
  });
};

export const updateBook = async (book) => {
  return await bookRepository.save(book);
};

export const createBook = async (book) => {
  return await bookRepository.save(book);
};

export const deleteById = async (id) => {
  return await bookRepository.delete(id);
};
