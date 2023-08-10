import { Injectable } from "@nestjs/common";
import { createReadStream, existsSync, writeFile } from "fs";
import { join } from "path";

@Injectable()
export class ImageRepository {

    findImage(national_id: string) {
        const path: string = join(process.cwd(), 'data', 'pics', `${national_id}.jpg`);
        const defaultPath: string = join(process.cwd(), 'data', 'pics', 'default.jpg');

        if (existsSync(path)) {
            return createReadStream(path);
        }

        return createReadStream(defaultPath);
    }

    async saveImage(imageName: string, imageBuffer: Buffer) {
        const outputPath = join(process.cwd(), 'data', 'pics', imageName);
        
        return new Promise((resolve, reject) => {
            writeFile(outputPath, imageBuffer, (error: any) => {
                (!error) ? resolve({
                    statusCode: 200,
                    message: "Uploaded Image Successfully."
                }) : reject({
                    statusCode: 400,
                    message: error.message
                })
            })
        });
    }
}