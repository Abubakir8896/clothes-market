import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from '../files/file.service';
import { Product } from '../product/models/product.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Customer } from '../customer/models/customer.model';
import { CustomerGuard } from '../guards/customer.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrderService 
{
    constructor(@InjectModel(Order) private  orderRepo: typeof Order, private readonly jwtService:JwtService){}
  async create(createOrderDto: CreateOrderDto, req:Request) {

    const refresh_token = req['cookies'].refresh_token;
    const user: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})

    const ishaveuser = await Customer.findOne({where:{id:user.id}})
    const ishaveProduct = await Product.findOne({where:{id:createOrderDto.product_id}})

    if(!ishaveuser){
      throw new BadRequestException({message:"Kechirasiz bunday IDli customer yoq"})
    }

    if(!ishaveProduct){
      throw new BadRequestException({message:"Kechirasiz bunday IDli Product mavjud emas"})
    }

    const count_product = await Product.findOne({where:{id:createOrderDto.product_id}})
    if(count_product.count < createOrderDto.count){
      throw new BadRequestException({message:"kechirasiz siz sorayotkanchalik maxsulotimiz yo'q"})
    }
    const new_count = count_product.count-createOrderDto.count
    await Product.update({count:new_count}, {where:{id:createOrderDto.product_id}})

    const user_id = user.id
    const product = await this.orderRepo.create({...createOrderDto,user_id});
    return product
  }

  async findAllOrders():Promise<Order[]>{
    return  this.orderRepo.findAll()
}

async findById(id:number):Promise<Order>{
    return this.orderRepo.findByPk(id,{include:{all:true}})
}
}