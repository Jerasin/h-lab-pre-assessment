import { applyDecorators, Get, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

import { Version } from '@nestjs/common';
import {
  CreateSuccesstDto,
  ErrorResponseDto,
} from 'src/common/dto/response.dto';
import { PaginationProductResponseDto } from './dto/product-response.dto';

export function CreateProduct() {
  return applyDecorators(
    Version('1'),
    Post(),
    ApiOperation({ summary: 'Create A New Product' }),
    ApiBody({ type: CreateProductDto }),
    ApiCreatedResponse({ type: CreateSuccesstDto }),
    ApiBadRequestResponse({
      description: 'Invalid product data',
      type: ErrorResponseDto,
    }),
    ApiNotFoundResponse({ type: ErrorResponseDto }),
    ApiInternalServerErrorResponse({
      description: 'Unexpected error',
      type: ErrorResponseDto,
    }),
  );
}

export function SearchProduct() {
  return applyDecorators(
    Version('1'),
    Get('search'),
    ApiOperation({ summary: 'Search Product' }),
    ApiOkResponse({ type: PaginationProductResponseDto }),
    ApiInternalServerErrorResponse({
      description: 'Unexpected error',
      type: ErrorResponseDto,
    }),
  );
}
