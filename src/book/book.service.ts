import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Book from './book.entity';
import { CreateBookDto } from './dto/createBook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createBook(book: CreateBookDto) {
    const newBook = await this.bookRepository.create(book);
    await this.bookRepository.save(newBook);
    return newBook;
  }
}
