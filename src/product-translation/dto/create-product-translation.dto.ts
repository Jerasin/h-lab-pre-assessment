import { ApiProperty } from '@nestjs/swagger';

export class CreateProductTranslationDto {
  @ApiProperty({
    example: 'en',
  })
  language: string;

  @ApiProperty({
    example: 'Laptop',
  })
  name: string;

  @ApiProperty({
    example: 'High performance laptop.',
  })
  description: string;

  @ApiProperty({
    example: 1,
  })
  productId: number;
}
