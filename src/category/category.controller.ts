import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAllCategories();
  }

  @Get('one')
  findByCode(@Query('code') code: string) {
    return this.categoryService.findCategoryByCode(code);
  }

}
