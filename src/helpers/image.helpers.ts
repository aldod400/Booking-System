import { promises as fs } from 'fs';
import { join } from 'path';

export class ImageHelpers {
    
     static async saveFile(basePath: string, fileName: string, buffer: Buffer): Promise<string> {
        const fullPath = join(process.cwd(), basePath);

        await fs.mkdir(fullPath, { recursive: true });

        const filePath = join(fullPath, fileName);
         
        await fs.writeFile(filePath, buffer);

        return `${basePath}/${fileName}`;
    }
}