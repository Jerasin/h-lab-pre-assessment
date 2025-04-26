import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProductTranslationDto } from 'src/product-translation/dto/create-product-translation.dto';

export class CreateProductDto {
  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    example: 200.4,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 200,
  })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: [
      {
        language: 'th',
        name: 'แล็ปท็อป',
        description: 'แล็ปท็อปประสิทธิภาพสูง',
      },
      {
        language: 'en',
        name: 'Laptop',
        description: 'High performance laptop.',
      },
    ],
  })
  @IsNotEmpty()
  productTranslation: CreateProductTranslationDto[];
}
