import Author from 'src/author/author.entity';

export class CreateBookDto {
  name: string;
  author: Author;
}
