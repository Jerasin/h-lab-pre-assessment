import { Test, TestingModule } from '@nestjs/testing';
import { ProductTranslationService } from './product-translation.service';
import { Repository } from 'typeorm';
import { ProductTranslation } from './entities/product-translation.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

const mockProductTranslationRepository = {
  // Mock methods of ProductTranslationRepository
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('ProductTranslationService', () => {
  let service: ProductTranslationService;
  let repo: Repository<ProductTranslation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductTranslationService,
        {
          provide: getRepositoryToken(ProductTranslation),
          useValue: mockProductTranslationRepository,
        },
      ],
    }).compile();

    service = module.get<ProductTranslationService>(ProductTranslationService);
    repo = module.get<Repository<ProductTranslation>>(
      getRepositoryToken(ProductTranslation),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
