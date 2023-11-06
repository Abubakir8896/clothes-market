import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './models/discount.model';

@Injectable()
export class DiscountService {
    constructor(@InjectModel(Discount) private roleRepo:typeof Discount){}

    async createCategory(createDiscountDto:CreateDiscountDto): Promise<Discount>{
        const discount = await this.roleRepo.create(createDiscountDto);
        return discount
    }

    async findAllCategory():Promise<Discount[]>{
        return  this.roleRepo.findAll()
    }

    async findById(id:number):Promise<Discount>{
        return this.roleRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const discount = await  this.roleRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateDiscountDto:UpdateDiscountDto){
        const discount = await this.roleRepo.update(updateDiscountDto,{where: {id},returning:true});
        return discount[1][0]
    }
}


