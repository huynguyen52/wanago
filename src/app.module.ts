import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthenticationModule,
    AuthorModule,
    BookModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
