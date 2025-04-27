import { ApiProperty } from '@nestjs/swagger';

export class ProductTranslationResponseDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'en' })
  language: string;

  @ApiProperty({ example: 'Laptop' })
  name: string;

  @ApiProperty({ example: 'Laptop' })
  description: string;

  @ApiProperty({ example: 1 })
  productId: number;
}
