import { AppDataSource } from "../config/data-source";
import { BookInstance } from "../entity/bookInstance.entity";

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const numberOfBookInstances = async () => {
  const bookInstances = await bookInstanceRepository.count();
  return bookInstances;
};

export const availableBookInstances = async () => {
  const bookInstances = await bookInstanceRepository.find({
    where: { status: "available" },
  });
  return bookInstances;
};

export const listBookInstances = async () => {
  return await bookInstanceRepository.find({
    relations: ["book"],
  });
};

export const findById = async (id) => {
  return await bookInstanceRepository.findOne({
    where: { id: id },
    relations: ["book"],
  });
};
