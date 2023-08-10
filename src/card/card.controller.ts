import { Body, Controller, Delete, Get, Patch, Post, Put, Query } from '@nestjs/common';
import { CardService } from './card.service';
import { createCard } from './dto/createCard.dto';
import { updateCard } from './dto/updateCard.dto';

@Controller('card')
export class CardController {

    constructor(private cardService: CardService) { }

    @Get('get-all')
    getAllCards(){
        return this.cardService.findAll();
    }

    @Post('create')
    createCard(@Body() body: createCard){
        return this.cardService.create(body);
    }

    @Put('update')
    updateCard(@Body() body: updateCard){
        return this.cardService.update(body);
    }

    @Delete('delete')
    deleteCard(@Query('id') id: string){
        return this.cardService.delete(parseInt(id));
    }

}
