import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductTranslationDto {
  @ApiProperty({
    example: 'en',
  })
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    example: 'Laptop',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'High performance laptop.',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  productId: number;
}
