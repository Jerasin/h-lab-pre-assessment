import { Injectable } from '@nestjs/common';
import { CreateProductTranslationDto } from './dto/create-product-translation.dto';
import { UpdateProductTranslationDto } from './dto/update-product-translation.dto';
import { DataSource } from 'typeorm';
import { ProductTranslation } from './entities/product-translation.entity';

@Injectable()
export class ProductTranslationService {
  constructor(private dataSource: DataSource) {}
  async create(createProductTranslationDto: CreateProductTranslationDto) {
    return this.dataSource.transaction(async (manager) => {
      const productTranslation = manager.create(
        ProductTranslation,
        createProductTranslationDto,
      );
      const savedProductTranslation = await manager.save(productTranslation);

      return savedProductTranslation;
    });
  }

  findAll() {
    return `This action returns all productTranslation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productTranslation`;
  }

  update(id: number, updateProductTranslationDto: UpdateProductTranslationDto) {
    return `This action updates a #${id} productTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} productTranslation`;
  }
}
