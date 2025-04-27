import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTranslationDto } from 'src/product-translation/dto/create-product-translation.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { INestApplication } from '@nestjs/common';

const products = {
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

const mockProductService = {
  create: jest
    .fn()
    .mockImplementation((product: CreateProductDto) =>
      Promise.resolve({ id: 1, ...product }),
    ),
  search: jest.fn().mockResolvedValue(products),
};

describe('ProductController', () => {
  let controller: ProductController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('newProduct', () => {
    it('should create a new product', async () => {
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

      await expect(controller.create(createProductDto)).resolves.toEqual({
        id: 1,
        ...createProductDto,
      });
    });
  });

  describe('searchProduct', () => {
    it('should create a new product', async () => {
      const query: SearchProductDto = {
        page: 1,
        limit: 10,
      };

      await expect(controller.findAll(query)).resolves.toEqual(products);
    });
  });
});
