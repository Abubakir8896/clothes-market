import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Discount } from '../discount/models/discount.model';
import { Product } from '../product/models/product.model';
import { CreateProductDiscountDto } from './dto/create-product_discount.dto';
import { UpdateProductDiscountDto } from './dto/update-product_discount.dto';
import { ProductDiscount } from './model/product_discount.model';

@Injectable()
export class ProductDiscountService {
    constructor(@InjectModel(ProductDiscount) private ProductDiscountRepo:typeof ProductDiscount){}

    async createProductDiscount(createProductDiscountDto:CreateProductDiscountDto): Promise<ProductDiscount>{
      const {product_id, discount_id} = createProductDiscountDto

      const IsProduct_id = await Product.findOne({where:{id:product_id}})

      if(!IsProduct_id){
        throw new BadRequestException("Kechirasiz siz kiritgan product_idli mahsulot mavjud emas")
      }

      const IsDiscount_Id = await Discount.findOne({where:{id:discount_id}})

      if(!IsDiscount_Id){
        throw new BadRequestException("Kechirasiz siz kiritgan discount_isli discount mavjud emas")
      }
      const ProductDiscount = await this.ProductDiscountRepo.create(createProductDiscountDto)
      return ProductDiscount
  }

    async findAllProductDiscount():Promise<ProductDiscount[]>{
        return  this.ProductDiscountRepo.findAll()
    }

    async findById(id:number):Promise<ProductDiscount>{
        return this.ProductDiscountRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const ProductDiscount = await  this.ProductDiscountRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateProductDiscountDto:UpdateProductDiscountDto){
        const {product_id, discount_id} = updateProductDiscountDto

        const IsProduct_id = await Product.findOne({where:{id:product_id}})
  
        if(!IsProduct_id){
          throw new BadRequestException("Kechirasiz siz kiritgan product_idli mahsulot mavjud emas")
        }
  
        const IsDiscount_Id = await Discount.findOne({where:{id:discount_id}})
  
        if(!IsDiscount_Id){
          throw new BadRequestException("Kechirasiz siz kiritgan discount_isli discount mavjud emas")
        }
        const ProductDiscount = await this.ProductDiscountRepo.update(updateProductDiscountDto,{where: {id},returning:true});
        return ProductDiscount[1][0]
    }
}


