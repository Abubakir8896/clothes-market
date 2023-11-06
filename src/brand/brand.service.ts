import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { FileService } from '../files/file.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './models/brand.model';

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand) private brandRepo:typeof Brand, private readonly fileService: FileService){}

    async createBrand(createBrandDto:CreateBrandDto, image:any): Promise<Brand>{
      const fileName = await this.fileService.createFile(image)
        const brand = await this.brandRepo.create({...createBrandDto, image:fileName});
        return brand
    }

    async findAllCategory():Promise<Brand[]>{
        return  this.brandRepo.findAll()
    }

    async findById(id:number):Promise<Brand>{
        return this.brandRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const brand = await  this.brandRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, UpdateBrandDto:UpdateBrandDto){
        const brand = await this.brandRepo.update(UpdateBrandDto,{where: {id},returning:true});
        return brand[1][0]
    }
}


