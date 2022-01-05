import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JWTGuard } from 'src/authentication/jwt.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { FindUploadDto } from './dto/find-upload.dto';
import { UploadsService } from './uploads.service';
import { storage } from './storage.config';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @Post()
  public async create(@UploadedFile('file') file: Express.Multer.File) {
    return this.uploadsService.create({
      originalName: file.originalname,
      fileName: file.filename,
      path: process.env.API_PATH + `uploads/${file.filename}`,
      size: String(file.size),
      mimetype: file.mimetype,
    });
  }

  @Get()
  public async findAll(@Query() query: FindUploadDto) {
    return this.uploadsService.findAll(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(+id);
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.uploadsService.remove(+id);
  }
}
