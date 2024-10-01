import { In } from "typeorm";
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

export const findById = async (id) => {
  return await genreRepository.findOne({
    where: { id: id },
    relations: ["books"],
  });
};

export const findByName = async (name) => {
  return await genreRepository.findOne({
    where: { name },
  });
};

export const createGenre = async (name) => {
  return await genreRepository.save({
    name,
  });
};

export const findGenres = async (listId) => {
  return await genreRepository.find({
    where: { id: In(listId) },
  });
};

export const deleteById = async (id) => {
  return await genreRepository.delete(id);
};
