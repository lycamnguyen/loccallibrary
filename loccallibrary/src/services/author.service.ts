import { AppDataSource } from "../config/data-source";
import { Author } from "../entity/author.entity";

const authorRepository = AppDataSource.getRepository(Author);

export const numberOfAuthors = async () => {
  const authors = await authorRepository.count();
  return authors;
};

export const listAuthors = async () => {
  return await authorRepository.find({
    order: { firstName: "ASC" },
    relations: ["books"],
  });
};

export const findById = async (id) => {
  return await authorRepository.findOne({
    where: { id: id },
    relations: ["books"],
  });
};

export const deleteById = async (id) => {
  return await authorRepository.delete(id);
};

export const isExists = async (author) => {
  return await authorRepository.findOne({
    where: {
      dateOfBirth: author.dateOfBirth,
      dateOfDeath: author.dateOfDeath,
      firstName: author.firstName,
      familyName: author.familyName,
    },
  });
};

export const createAuthor = async (author) => {
  return await authorRepository.save(author);
};
