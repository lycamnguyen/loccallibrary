import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class BookInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imprint: string;

  @Column()
  status: string;

  @Column()
  due_back: Date;

  @ManyToOne(() => Book, (book) => book.bookInstances)
  book: Book;

  constructor(init?: Partial<BookInstance>) {
    Object.assign(this, init);
  }

  get url(): string {
    return `bookInstance/${this.id}`;
  }
}
