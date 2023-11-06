import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Category } from '../category/models/category.model';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { ProductCategory } from './models/product_category.model';

@Injectable()
export class ProductCategoryService {
    constructor(@InjectModel(ProductCategory) private productCategoryRepo:typeof ProductCategory){}

    async createCategory(createProductCategoryDto:CreateProductCategoryDto): Promise<ProductCategory>{
        const {category_id} = createProductCategoryDto

        const Iscategory_id = await Category.findOne({where:{id:category_id}})

        if(!Iscategory_id){
            throw new BadRequestException("Kechirasiz siz kiritgan categoriy_id mavjud emas")
        }
        
        const productCategory = await this.productCategoryRepo.create(createProductCategoryDto);
        return productCategory
    }

    async findAllCategory():Promise<ProductCategory[]>{
        return  this.productCategoryRepo.findAll()
    }

    async findById(id:number):Promise<ProductCategory>{
        return this.productCategoryRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const productCategory = await  this.productCategoryRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateProductCategoryDto:UpdateProductCategoryDto){
      const productCategory = await this.productCategoryRepo.update(updateProductCategoryDto,{where: {id},returning:true});
      return productCategory[1][0]
  }
}

