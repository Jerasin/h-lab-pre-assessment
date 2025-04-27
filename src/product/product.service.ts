import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductTranslation } from 'src/product-translation/entities/product-translation.entity';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.dataSource.transaction(async (manager) => {
      const product = manager.create(Product, createProductDto);
      const savedProduct = await manager.save(product);

      const translations = createProductDto.productTranslation.map((i) =>
        manager.create(ProductTranslation, {
          ...i,
          product: savedProduct,
        }),
      );

      await manager.save(translations);
      return {
        ...savedProduct,
        translations,
      } as Product;
    });
  }

  async search(dto: SearchProductDto): Promise<PaginationProductResponseDto> {
    const { translationName, lang, page = 1, limit = 10 } = dto;
    let query: SelectQueryBuilder<Product> = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.translations', 'translation');

    if (lang == null && translationName == null) {
      throw new HttpException(
        'select translationName or lang',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (lang != null) {
      query = query.where('translation.language = :lang', { lang });
    }

    if (translationName != null) {
      query = query.andWhere('translation.name = :translationName', {
        translationName,
      });
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    console.log('data', JSON.stringify(data));

    const results = data.map((p) => ({
      id: p.id,
      isActive: p.isActive,
      translation:
        lang != null
          ? p.translations.find((t) => t.language === lang)
          : p.translations.find((t) => t.name === translationName),
    }));

    return plainToInstance(PaginationProductResponseDto, {
      page,
      limit,
      total,
      data: results,
    });
  }
}
