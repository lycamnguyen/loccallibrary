import { AppDataSource } from "../config/data-source";
import { Genre } from "../entity/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

export const numberOfGenres = async () => {
  const genres = genreRepository.count();
  return genres;
};
