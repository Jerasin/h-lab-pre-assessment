import { Test, TestingModule } from '@nestjs/testing';
import { ProductTranslationController } from './product-translation.controller';
import { ProductTranslationService } from './product-translation.service';

const mockProductTranslationService = {
  findAll: jest.fn(),
};

describe('ProductTranslationController', () => {
  let controller: ProductTranslationController;
  let service: ProductTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTranslationController],
      providers: [
        {
          provide: ProductTranslationService,
          useValue: mockProductTranslationService,
        },
      ],
    }).compile();

    controller = module.get<ProductTranslationController>(
      ProductTranslationController,
    );
    service = module.get<ProductTranslationService>(ProductTranslationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
