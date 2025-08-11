import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class FileService {
  private basePath = path.resolve(__dirname, '../../files');

  constructor() {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
    }
  }

  async writeFile(fileName: string, content: string) {
    const fullPath = path.join(this.basePath, fileName);
    await writeFileAsync(fullPath, content);
    return { message: 'File written successfully', file: fileName };
  }

  async readFile(fileName: string) {
    const fullPath = path.join(this.basePath, fileName);
    if (!fs.existsSync(fullPath)) {
      throw new NotFoundException('File not found');
    }
    const content = await readFileAsync(fullPath, 'utf8');
    return { file: fileName, content };
  }

  async deleteFile(fileName: string) {
    const fullPath = path.join(this.basePath, fileName);
    if (!fs.existsSync(fullPath)) {
      throw new NotFoundException('File not found');
    }
    await unlinkAsync(fullPath);
    return { message: 'File deleted successfully', file: fileName };
  }

  listFiles() {
    const files = fs.readdirSync(this.basePath);
    return { files };
  }
}
