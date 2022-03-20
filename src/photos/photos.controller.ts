import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JWTGuard } from '@authentication/jwt.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FindPhotoDto } from './dto/find-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Post()
  public async create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  public async findAll(@Query() query: FindPhotoDto) {
    return this.photosService.findAll(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
