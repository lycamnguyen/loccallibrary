import { AppDataSource } from "../config/data-source";
import { Author } from "../entity/author.entity";

const authorRepository = AppDataSource.getRepository(Author);

export const numberOfAuthors = async () => {
  const authors = await authorRepository.count();
  return authors;
};
