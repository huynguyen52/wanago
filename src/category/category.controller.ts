import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Post()
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoryService.createCategory(category);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.categoryService.updateCategory(+id, category);
  }
}
