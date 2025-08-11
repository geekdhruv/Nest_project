import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('write')
  writeFile(@Body() body: { fileName: string; content: string }) {
    return this.fileService.writeFile(body.fileName, body.content);
  }

  @Get('read/:fileName')
  readFile(@Param('fileName') fileName: string) {
    return this.fileService.readFile(fileName);
  }

  @Delete(':fileName')
  deleteFile(@Param('fileName') fileName: string) {
    return this.fileService.deleteFile(fileName);
  }

  @Get()
  listFiles() {
    return this.fileService.listFiles();
  }
}
