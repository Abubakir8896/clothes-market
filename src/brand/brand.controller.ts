import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreaterAdminGuard } from '../guards/admin.guard';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './models/brand.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';

@ApiTags("Brend")
@Controller('brand')
export class BrandController {
    constructor(private readonly BrandService:BrandService){}

    @ApiOperation({summary:"Create Brand"})
    @UseGuards(CreaterAdminGuard)
    @UseInterceptors(FileInterceptor("image"))
    @Post('create')
    async createRole(@Body() createBrandDto:CreateBrandDto,@UploadedFile() image:any ):Promise<Brand>{
        return this.BrandService.createBrand(createBrandDto, image)    
    }

    @ApiOperation({summary:"Get All Brands"})
    @ApiResponse({status:200, description:"List of Categories", type:[Brand]})
    @Get('all')
    async findAllCompany():Promise<Brand[]>{
        return this.BrandService.findAllCategory()
    }

    @ApiOperation({summary:"Get Brands by id"})
    @ApiResponse({status:200, description:"List of Category", type:[Brand]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Brand>{
        return this.BrandService.findById(+id)
    }

    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Delete Brand"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.BrandService.deleteById(+id)
    }
    
    @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Update Brand"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateBrandDto:UpdateBrandDto){
        return this.BrandService.updateById(+id,updateBrandDto)
    }
}
