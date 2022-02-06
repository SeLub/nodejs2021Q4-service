import {
      Controller,
      Get,
      Param,
      Post,
      StreamableFile,
      UploadedFile,
      UseInterceptors,
    } from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { FileUploadService } from './files.service.js';
    
    @Controller('file')
    export class FilesController {
      constructor(private readonly filesService: FileUploadService) {}
    
      @Post()
      @UseInterceptors(FileInterceptor('file'))
      uploadFile(@UploadedFile() file: Express.Multer.File) {
        return `The file ${file.originalname} is uploaded to the src/files/uploads folder`;
      }
    
      @Get(':filename')
      findOne(@Param('filename') filename: string): StreamableFile {
        return this.filesService.findOne(filename);
      }
    }