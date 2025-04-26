import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationProductResponseDto } from './dto/product-response.dto';
import {
  ErrorResponseDto,
  CreateSuccesstDto,
} from 'src/common/dto/response.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ type: CreateSuccesstDto })
  @ApiBadRequestResponse({
    description: 'Invalid product data',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error',
    type: ErrorResponseDto,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    return product;
  }

  @Get('search')
  @ApiOkResponse({ type: PaginationProductResponseDto })
  findAll(
    @Query() query: SearchProductDto,
  ): Promise<PaginationProductResponseDto> {
    return this.productService.search(query);
  }
}
