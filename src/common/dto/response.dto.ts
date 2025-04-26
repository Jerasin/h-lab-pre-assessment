import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class ResponseDto<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty()
  data: T;
}

export class PaginationResponseDto {
  @ApiPropertyOptional({
    example: 1,
  })
  @Expose()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
  })
  @Expose()
  @Type(() => Number)
  limit?: number = 10;
}

export class ErrorResponseDto {
  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  error?: string;

  @ApiProperty()
  statusCode: number;
}

export class CreateSuccesstDto {
  @ApiProperty({
    example: 'create success',
  })
  message: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;
}
