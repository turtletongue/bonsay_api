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
import { unlink } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import 'multer';

import { JWTGuard } from '@authentication/jwt.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { RolesGuard } from '@utils/guards/roles.guard';
import { FindUploadDto } from './dto/find-upload.dto';
import { UploadsService } from './uploads.service';
import { storage } from './storage.config';

const unlinkAsync = promisify(unlink);

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
      path: `${process.env.API_PATH}api/files/${file.filename}`,
      internalPath: `${process.env.API_INTERNAL_PATH}api/files/${file.filename}`,
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
    const upload = await this.findOne(id);

    await unlinkAsync(
      join(__dirname, '..', '..', 'public', 'files', upload.fileName),
    );

    return this.uploadsService.remove(+id);
  }
}
