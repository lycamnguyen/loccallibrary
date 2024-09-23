import { Book } from "./book.entity";

import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  familyName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  dateOfDeath: Date;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  constructor(init?: Partial<Author>) {
    Object.assign(this, init);
  }

  get url(): string {
    return `author/${this.id}`;
  }

  get name(): string {
    return `${this.firstName} ${this.familyName}`;
  }
}
