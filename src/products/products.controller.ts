import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JWTGuard } from 'src/authentication/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Post()
  public async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  public async findAll(@Query() query: FindProductDto) {
    return this.productsService.findAll(query);
  }

  @Get('/bestsellers')
  public async findBestsellers(@Query() query: FindProductDto) {
    return await this.productsService.findBestsellers(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
