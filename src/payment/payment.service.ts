import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Product } from '../product/models/product.model';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { Payment } from './models/payment.model';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Customer } from './../customer/models/customer.model';
import { JwtService } from '@nestjs/jwt';
import { Order } from '../orders/models/order.model';
import * as bcrypt from 'bcrypt'


@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment) private paymentRepo:typeof Payment, private readonly jwtService:JwtService){}

    async createPayment(createPaymentCardDto:CreatePaymentCardDto, req:Request): Promise<Payment>{
        const refresh_token = req['cookies'].refresh_token;
        const admin: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})

        const ishaveuser = await Customer.findOne({where:{id:admin.id}})
        const ishaveOrder = await Order.findOne({where:{id:createPaymentCardDto.order_id}})
    
        const {card_number} = createPaymentCardDto

        if(card_number.length > 12){
          throw new BadRequestException("Karta Raqami Xato")
        }

        if(!ishaveuser){
          throw new BadRequestException({message:"Kechirasiz bunday IDli customer yoq"})
        }
    
        if(!ishaveOrder){
          throw new BadRequestException({message:"Kechirasiz bunday IDli Order mavjud emas"})
        }

        const hashed_pincode = await bcrypt.hash(createPaymentCardDto.Pincode, 7)

        const user_id = admin.id
        await Order.update({payment_status:true}, {where:{id:ishaveOrder.id}})
        await Product.update({number_purchases:ishaveOrder.count}, {where:{id:ishaveOrder.product_id}})
        const payment = await this.paymentRepo.create({...createPaymentCardDto,user_id, Pincode:hashed_pincode});
        return payment
    }

    async findAllPayments():Promise<Payment[]>{
        return  this.paymentRepo.findAll()
    }

    async findById(req:Request):Promise<Payment>{
      const refresh_token = req['cookies'].refresh_token;
      const admin: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})

      const isHaveUser = await Customer.findOne({where:{id:admin.id}})

      if(!isHaveUser){
        throw new BadRequestException({message:"Kechirasiz bunday IDli customer yoq"})
      }
      const result = await this.paymentRepo.findOne({where:{user_id:admin.id}, include:{all:true}})
        return result
    }
}


