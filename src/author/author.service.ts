import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Author from './author.entity';
import { CreateAuthorDto } from './dto/createAuthor.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async createAuthor(author: CreateAuthorDto) {
    const newAuthor = this.authorRepository.create(author);
    console.log(111, newAuthor);
    await this.authorRepository.save(newAuthor);
    return newAuthor;
  }
}
