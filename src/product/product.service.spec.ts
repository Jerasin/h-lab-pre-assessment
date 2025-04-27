import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { SearchProductDto } from './dto/search-product.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTranslationDto } from 'src/product-translation/dto/create-product-translation.dto';

const mockProductRepo = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
  leftJoinAndSelect: jest.fn().mockReturnThis(),
};

const mockManager = {
  create: jest.fn(),
  save: jest.fn(),
};

const mockDataSource = {
  transaction: jest
    .fn()
    .mockImplementation((callback) => callback(mockManager)),
};

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<Product>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product with translations', async () => {
      const productTranslations: CreateProductTranslationDto[] = [
        {
          language: 'th',
          name: 'แล็ปท็อป',
          description: 'แล็ปท็อปประสิทธิภาพสูง',
          productId: 1,
        },
        {
          language: 'en',
          name: 'Laptop',
          description: 'High performance laptop.',
          productId: 1,
        },
      ];
      const createProductDto: CreateProductDto = {
        isActive: true,
        price: 500,
        amount: 20,
        productTranslation: productTranslations,
      };

      const savedProduct = { id: 1, isActive: true, price: 500, amount: 20 };
      const translations = [
        {
          id: 1,
          name: 'Product name in English',
          language: 'en',
          product: savedProduct,
        },
        {
          id: 2,
          name: 'Nombre del producto en español',
          language: 'es',
          product: savedProduct,
        },
      ];

      mockManager.create
        .mockImplementationOnce(() => savedProduct) // create product
        .mockImplementationOnce(() => translations[0]) // create first translation
        .mockImplementationOnce(() => translations[1]); // create second translation

      // mock manager.save()
      mockManager.save
        .mockImplementationOnce(async () => savedProduct) // save product
        .mockImplementationOnce(async () => translations); // save translations

      const result = await service.create(createProductDto);
      expect(result).toEqual({
        ...savedProduct,
        translations,
      });
    });
  });

  describe('search', () => {
    it('should throw an error if neither translationName nor lang is provided', async () => {
      const searchDto: SearchProductDto = { page: 1, limit: 10 };

      await expect(service.search(searchDto)).rejects.toThrow(
        new HttpException(
          'select translationName or lang',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should return paginated search results', async () => {
      const searchDto: SearchProductDto = {
        translationName: 'Product name in English',
        lang: 'en',
        page: 1,
        limit: 10,
      };

      const product = {
        id: 1,
        isActive: true,
        translations: [
          {
            id: 1,
            name: 'Product name in English',
            language: 'en',
            product: { id: 1 },
          },
          {
            id: 2,
            name: 'Nombre del producto en español',
            language: 'es',
            product: { id: 1 },
          },
        ],
      };

      // Mock query builder
      mockProductRepo.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[product], 1]),
      });

      // Mock pagination and query result
      const result = await service.search(searchDto);

      expect(result).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        data: [
          {
            id: product.id,
            isActive: product.isActive,
            translation: product.translations.find((t) => t.language === 'en'),
          },
        ],
      });
    });
  });
});
