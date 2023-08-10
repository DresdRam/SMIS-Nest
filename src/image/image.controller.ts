import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Query, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { ReadStream } from 'fs';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('image')
export class ImageController {

    constructor(private imageService: ImageService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: (req, file, cb) => {

            if (!file.originalname.match(/\.(jpg|JPG)$/)) {
                return cb(null, false);
            }

            return cb(null, true);
        },
        limits: { fileSize: 1024 * 1024 }
    }),)
    saveSoldierImage(@UploadedFile() image: Express.Multer.File) {

        if (!image) {
            return {
                statusCode: 400,
                message: "File Is Not Supported."
            }
        }

        return this.imageService.saveImage(image.originalname, image.buffer);
    }

    @Get('get')
    getSoldierImage(@Query('national_id') national_id: string, @Res() response: Response) {
        const image: ReadStream = this.imageService.findImage(national_id);
        image.pipe(response);
    }

}
