import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from '../files/file.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { Op } from 'sequelize';
import { ProductCategory } from './../product_category/models/product_category.model';
import { Brand } from '../brand/models/brand.model';

@Injectable()
export class ProductService 
{
    constructor(@InjectModel(Product) private  productRepo: typeof Product,
    private readonly fileService: FileService){}
  async create(createProductDto: CreateProductDto, photo:any) {
    const {product_category_id, brend_id} = createProductDto

    const IsProduct_category_id  = await ProductCategory.findOne({where:{id:product_category_id}})

    if(!IsProduct_category_id){
      throw new BadRequestException("Kechirasiz siz kiritkan product_category_idlik product category mavjud emas")
    }

    const isBrandId = await Brand.findOne({where:{id:brend_id}})
    
    if(!isBrandId){
      throw new BadRequestException("Kechirasiz siz kiritkan brand_id mavjud emas")
    }
    const fileName = await this.fileService.createFile(photo)
    const product = await this.productRepo.create({...createProductDto, photo:fileName});
    return product
  }

  async findAllProduct():Promise<Product[]>{
    return  this.productRepo.findAll()
}

async findById(id:number):Promise<Product>{
    return this.productRepo.findByPk(id,{include:{all:true}})
}

async deleteById(id:number):Promise<string>{
  const product = await  this.productRepo.destroy({where:{id}})
  return "Success"
}

async updateById(id:number, updateProductDto:UpdateProductDto){
  const product = await this.productRepo.update(updateProductDto,{where: {id},returning:true});
  return product[1][0]
}

async findProduct(findProductDto: FindProductDto) {
  let where = {}

  if (findProductDto.name) { where['name'] = { [Op.like]: `%${findProductDto.name}%`}}
  
  if (findProductDto.min_price) {
    where = {
      ...where,
      price: {
        [Op.gt]: findProductDto.min_price
      }
    }
  }
  if (findProductDto.description) { where['description'] = { [Op.like]: `%${findProductDto.description}%`}}
  if (findProductDto.product_category_id) {
    where = {
      ...where,
      category_id: {
        [Op.lt]: findProductDto.product_category_id
      }
    }
  }

  return this.productRepo.findAll({where, include: {all: true}});
}
}