import { NotFoundException } from '@nestjs/common';

export class PostNotFundException extends NotFoundException {
  constructor(postId: string) {
    super(`Post with id  ${postId} not found`);
  }
}
