import { Controller, Body } from '@nestjs/common';
import { ProductTranslationService } from './product-translation.service';
import { FindAllProductTranslation } from './product-translation.decorator';

@Controller('product-translation')
export class ProductTranslationController {
  constructor(
    private readonly productTranslationService: ProductTranslationService,
  ) {}

  // @Post()
  // create(@Body() createProductTranslationDto: CreateProductTranslationDto) {
  //   return this.productTranslationService.create(createProductTranslationDto);
  // }

  @FindAllProductTranslation()
  async findAll() {
    return this.productTranslationService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productTranslationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductTranslationDto: UpdateProductTranslationDto) {
  //   return this.productTranslationService.update(+id, updateProductTranslationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productTranslationService.remove(+id);
  // }
}
