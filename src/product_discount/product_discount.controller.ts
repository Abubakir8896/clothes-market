import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreaterAdminGuard } from '../guards/admin.guard';
import { ProductDiscountService } from './product_discount.service';
import { CreateProductDiscountDto } from './dto/create-product_discount.dto';
import { UpdateProductDiscountDto } from './dto/update-product_discount.dto';
import { ProductDiscount } from './model/product_discount.model';

@ApiTags("product-discount")
@Controller('product-discount')
export class ProductDiscountController {
    constructor(private readonly productDiscountService:ProductDiscountService){}

    @ApiOperation({summary:"Create product-discount"})
    @UseGuards(CreaterAdminGuard)
    @Post('create')
    async createRole(@Body() createProductDiscountDto:CreateProductDiscountDto):Promise<ProductDiscount>{
        return this.productDiscountService.createProductDiscount(createProductDiscountDto)    
    }

    @ApiOperation({summary:"Get All ProductDiscount"})
    @ApiResponse({status:200, description:"List of Categories", type:[ProductDiscount]})
    @Get('all')
    async findAllCompany():Promise<ProductDiscount[]>{
        return this.productDiscountService.findAllProductDiscount()
    }

    @ApiOperation({summary:"Get ProductDiscount by id"})
    @ApiResponse({status:200, description:"List of Category", type:[ProductDiscount]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<ProductDiscount>{
        return this.productDiscountService.findById(+id)
    }

    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Delete ProductDiscount"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.productDiscountService.deleteById(+id)
    }
    
    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Update ProductDiscount"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateProductDiscountDto:UpdateProductDiscountDto){
        return this.productDiscountService.updateById(+id,updateProductDiscountDto)
    }
}
