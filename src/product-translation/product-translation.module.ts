import { Module } from '@nestjs/common';
import { ProductTranslationService } from './product-translation.service';
import { ProductTranslationController } from './product-translation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslation } from './entities/product-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTranslation])],
  controllers: [ProductTranslationController],
  providers: [ProductTranslationService],
})
export class ProductTranslationModule {}
