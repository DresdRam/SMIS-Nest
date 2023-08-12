import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {

    constructor(private imageRepository: ImageRepository){ }

    findImage(national_id: string){
        return this.imageRepository.findImage(national_id);
    }

    async saveImage(imageName: string, imageBuffer: Buffer){
        return await this.imageRepository.saveImage(imageName, imageBuffer);
    }

}
