import { Controller, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

import { SearchProductDto } from './dto/search-product.dto';
import { PaginationProductResponseDto } from './dto/product-response.dto';

import { CreateProduct, SearchProduct } from './product.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @CreateProduct()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    return product;
  }

  @SearchProduct()
  findAll(
    @Query() query: SearchProductDto,
  ): Promise<PaginationProductResponseDto> {
    return this.productService.search(query);
  }
}
