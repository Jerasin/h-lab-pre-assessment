import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductTranslation } from './entities/product-translation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductTranslationService {
  constructor(
    @InjectRepository(ProductTranslation)
    private productTranslationRepo: Repository<ProductTranslation>,
  ) {}
  // async create(createProductTranslationDto: CreateProductTranslationDto) {
  //   return this.dataSource.transaction(async (manager) => {
  //     const productTranslation = manager.create(
  //       ProductTranslation,
  //       createProductTranslationDto,
  //     );
  //     const savedProductTranslation = await manager.save(productTranslation);

  //     return savedProductTranslation;
  //   });
  // }

  async findAll() {
    return this.productTranslationRepo.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} productTranslation`;
  // }

  // update(id: number, updateProductTranslationDto: UpdateProductTranslationDto) {
  //   return `This action updates a #${id} productTranslation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} productTranslation`;
  // }
}
