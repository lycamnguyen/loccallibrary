import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];

  constructor(init?: Partial<Genre>) {
    Object.assign(this, init);
  }

  get url(): string {
    return `genre/${this.id}`;
  }
}
