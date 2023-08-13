import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get('get-all')
    getAllCategories(){
        return this.categoryService.findAll();
    }

    @Post('create')
    createCategory(@Body() body: CategoryDto){
        return this.categoryService.create(body);
    }

    @Delete('delete')
    deleteCategory(@Query('id') id: number){
        return this.categoryService.delete(id);
    }

    @Get('get-one')
    getCategory(@Query('id') id: number){
        return this.categoryService.findOne(id);
    }

    @Put('update')
    updateCategory(@Query('id') id: number, @Body() body: CategoryDto){
        return this.categoryService.update(id, body);
    }

}
