import { IsOptional, IsString, IsNumberString, IsEmpty, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchProductDto {
  @ApiPropertyOptional({
    example: 'en',
  })
  @IsOptional()
  @IsString()
  translationName?: string;

  @ApiPropertyOptional({
    example: 'en',
  })
  @IsOptional()
  @IsString()
  lang?: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;
}
