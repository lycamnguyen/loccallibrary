import { AppDataSource } from "../config/data-source";
import { Genre } from "../entity/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

export const numberOfGenres = async () => {
  const genres = await genreRepository.count();
  return genres;
};

export const listGenres = async () => {
  return await genreRepository.find({
    order: { name: "ASC" },
  });
};
