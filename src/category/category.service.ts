import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ){}

  async findAllCategories() {
    const categoryDB = await this.categoryRepository.createQueryBuilder('Category')
      .select(['Category.id', 'Category.name', 'Category.code'])
      .getMany();
    return categoryDB;
  }

  async findCategoryByCode(code: string) {
    const codeList = await this.findAllCategories();
    if(!codeList.find(element => element.code == code)) throw new InternalServerErrorException('Incorrect code, please enter another');

    const categoryDB = await this.categoryRepository.createQueryBuilder('Category')
      .select(['Category.id', 'Category.name', 'Category.code'])
      .where('Category.code = :code', {code: code})
      .getOne();
    return categoryDB;
  }

}
