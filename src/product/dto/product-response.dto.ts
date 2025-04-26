import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/common/dto/response.dto';

export class ProductTranslationDto {
  @ApiProperty({ example: 'en' })
  language: string;

  @ApiProperty({ example: 'iPhone 15' })
  name: string;

  @ApiProperty({ example: 'The latest Apple smartphone.' })
  description: string;
}

export class ProductResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ type: ProductTranslationDto })
  translation: ProductTranslationDto;
}

export class PaginationProductResponseDto extends PaginationResponseDto {
  @ApiProperty({
    example: [
      {
        id: 5,
        isActive: true,
        translation: {
          id: 8,
          language: 'en',
          name: 'Laptop',
          description: 'High performance laptop.',
          productId: 5,
        },
      },
      {
        id: 6,
        isActive: true,
        translation: {
          id: 10,
          language: 'en',
          name: 'Laptop',
          description: 'High performance laptop.',
          productId: 6,
        },
      },
    ],
  })
  data: ProductResponseDto[];
}
