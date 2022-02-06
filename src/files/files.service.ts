import {
      Injectable,
      InternalServerErrorException,
      StreamableFile,
    } from '@nestjs/common';
    import * as fs from 'fs';
    import { createReadStream } from 'fs';
    
    @Injectable()
    export class FileUploadService {
      findOne(filename: string): StreamableFile {
        const pathToFile = `${__dirname}/../../src/files/uploads/${filename}`;
    
        if (!fs.existsSync(pathToFile)) {
          throw new InternalServerErrorException(`File ${filename} doesn't exist`);
        }
    
        const fileStream = createReadStream(pathToFile);
    
        return new StreamableFile(fileStream);
      }
    }