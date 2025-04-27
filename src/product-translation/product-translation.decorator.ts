import { applyDecorators, Get, Version } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { ProductTranslationResponseDto } from './dto/product-translation-response.dto';

export function FindAllProductTranslation() {
  return applyDecorators(
    Version('1'),
    Get(),
    ApiOkResponse({ type: [ProductTranslationResponseDto] }),
    ApiOperation({ summary: 'Get List Product Translation' }),
    ApiInternalServerErrorResponse({
      description: 'Unexpected error',
      type: ErrorResponseDto,
    }),
  );
}
