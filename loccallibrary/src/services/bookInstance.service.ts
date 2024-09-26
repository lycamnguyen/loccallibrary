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
