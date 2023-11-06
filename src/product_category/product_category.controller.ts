import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreaterAdminGuard } from '../guards/admin.guard'
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { ProductCategory } from './models/product_category.model';
import { ProductCategoryService } from './product_category.service';

@ApiTags("product_category")
@Controller('productcategory')
export class ProductCategoryController {
    constructor(private readonly ProductCategoryService:ProductCategoryService){}

    @ApiOperation({summary:"Create category"})
    @UseGuards(CreaterAdminGuard)
    @Post('create')
    async createRole(@Body() createProductCategoryDto:CreateProductCategoryDto):Promise<ProductCategory>{
        return this.ProductCategoryService.createCategory(createProductCategoryDto)    
    }

    @ApiOperation({summary:"Get All Categories"})
    @ApiResponse({status:200, description:"List of Categories", type:[ProductCategory]})
    @Get('all')
    async findAllCompany():Promise<ProductCategory[]>{
        return this.ProductCategoryService.findAllCategory()
    }

    @ApiOperation({summary:"Get Categories by id"})
    @ApiResponse({status:200, description:"List of Category", type:[ProductCategory]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<ProductCategory>{
        return this.ProductCategoryService.findById(+id)
    }

    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Delete Category"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.ProductCategoryService.deleteById(+id)
    }
    
    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Update Category"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateProductCategoryDto:UpdateProductCategoryDto){
        return this.ProductCategoryService.updateById(+id,updateProductCategoryDto)
    }
}
