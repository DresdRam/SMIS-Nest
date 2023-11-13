import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get('get-all')
    getAllCategories(){
        return this.categoryService.findAll();
    }
    
    @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
    @Post('create')
    createCategory(@Body() body: CategoryDto){
        return this.categoryService.create(body);
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
    @Delete('delete')
    deleteCategory(@Query('id') id: number){
        return this.categoryService.delete(id);
    }

    @Get('get-one')
    getCategory(@Query('id') id: number){
        return this.categoryService.findOne(id);
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
    @Put('update')
    updateCategory(@Query('id') id: number, @Body() body: CategoryDto){
        return this.categoryService.update(id, body);
    }

}
