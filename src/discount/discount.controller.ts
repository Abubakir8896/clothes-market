import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreaterAdminGuard } from '../guards/admin.guard';

import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './models/discount.model';

@ApiTags("discount")
@Controller('discount')
export class DiscountController {
    constructor(private readonly DiscountService:DiscountService){}

    @ApiOperation({summary:"Create discount"})
    @UseGuards(CreaterAdminGuard)
    @Post('create')
    async createRole(@Body() createDiscountDto:CreateDiscountDto):Promise<Discount>{
        return this.DiscountService.createCategory(createDiscountDto)    
    }

    @ApiOperation({summary:"Get All Discount's"})
    @ApiResponse({status:200, description:"List of Discount's", type:[Discount]})
    @Get('all')
    async findAllCompany():Promise<Discount[]>{
        return this.DiscountService.findAllCategory()
    }

    @ApiOperation({summary:"Get Discount by id"})
    @ApiResponse({status:200, description:"List of Discount", type:[Discount]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Discount>{
        return this.DiscountService.findById(+id)
    }

    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Delete Discount"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.DiscountService.deleteById(+id)
    }
    
    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Update Discount"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateDiscountDto:UpdateDiscountDto){
        return this.DiscountService.updateById(+id,updateDiscountDto)
    }
}
