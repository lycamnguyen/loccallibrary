import { JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Author } from "./author.entity";
import { BookInstance } from "./bookInstance.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Genre } from "./genre.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  isbn: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookInstance, (bookInstance) => bookInstance.book)
  bookInstances: BookInstance[];

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  constructor(init?: Partial<Book>) {
    Object.assign(this, init);
  }

  get url(): string {
    return `book/${this.id}`;
  }
}
