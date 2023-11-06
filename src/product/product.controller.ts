import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards} from '@nestjs/common';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreaterAdminGuard } from '../guards/admin.guard';
import { Product } from './models/product.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindProductDto } from './dto/find-product.dto';

@ApiTags("product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(CreaterAdminGuard)
  @ApiOperation({summary: "Create Product"})
  @Post('create')
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createPostDto: CreateProductDto, @UploadedFile() photo:any) {
    return this.productService.create(createPostDto, photo)
  }

  @ApiOperation({summary: "Get All Products"})
  @ApiResponse({status:200, description:"List of Products", type:[Product]})
  @Get('all')
  async findAllCompany():Promise<Product[]>{
      return this.productService.findAllProduct()
  }

  @ApiOperation({summary: "Get Product by Id"})
  @ApiResponse({status:200, description:"List of Products", type:[Product]})
  @Get('one/:id')
  async findById(@Param("id") id:string):Promise<Product>{
      return this.productService.findById(+id)
  }

  @ApiOperation({summary: "Delete Product"})
  @ApiResponse({status:200, description:"Success"})
  @UseGuards(CreaterAdminGuard)
  @Delete("/:id")
  async deleteById(@Param('id') id:string):Promise<String>{
      return this.productService.deleteById(+id)
  }
  
  @UseGuards(CreaterAdminGuard)
  @ApiOperation({summary: "Update Product"})
  @ApiResponse({status:200, description:"List of Products", type:[Product]})
  @Put("update/:id")
  async updateById(@Param('id') id:string, @Body() updateProductDto:UpdateProductDto){
      return this.productService.updateById(+id,updateProductDto)
  }

  @ApiOperation({summary: "Find Products"})
  @ApiResponse({status:200, description:"List of Products", type:[Product]})
  @Get()
  findAll(@Body() findProductDto: FindProductDto) {
    return this.productService.findProduct(findProductDto);
  }
}