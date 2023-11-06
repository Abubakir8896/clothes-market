import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Customer } from '../customer/models/customer.model';
import { FileService } from '../files/file.service';
import { CreateProductCommentDto } from './dto/create-product_comment.dto';
import { ProductComment } from './models/product_comment.model';
import { JwtService } from '@nestjs/jwt';
import { Product } from '../product/models/product.model';

@Injectable()
export class ProductCommentsService {
    constructor(@InjectModel(ProductComment) private productCommentRepo:typeof ProductComment, 
    private readonly jwtService:JwtService){}

    async createComment(createProductCommentDto:CreateProductCommentDto,req:Request): Promise<ProductComment>{
        const refresh_token = req['cookies'].refresh_token;
        const {product_id} = createProductCommentDto
        const user: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})

        const ishaveuser = await Customer.findOne({where:{id:user.id}})

        if(!ishaveuser){
          throw new BadRequestException({message:"Kechirasiz bunday IDli Customer mavjud emas"})
        }

        const IsHaveProduct = await Product.findOne({where:{id:product_id}})

        if(!IsHaveProduct){
          throw new BadRequestException({message:"Kechirasiz bunday IDli Product mavjud emas"})
        }

        const user_id = user.id

        const productComment = await this.productCommentRepo.create({...createProductCommentDto, user_id});
        return productComment
    }

    async findAllComments():Promise<ProductComment[]>{
        return  this.productCommentRepo.findAll()
    }

    async deleteById(id:number, req:Request):Promise<string>{
        const refresh_token = req['cookies'].refresh_token;
        const result: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})

        const productComment = await  this.productCommentRepo.findOne({where:{id}})

        const product = productComment.product_id
        const user = productComment.user_id

        if(user!=result.id){
          throw new BadRequestException({message:"Kechirasiz bu commentni siz yozmaganingiz uchun commentni ochira olmaysiz"})
        }

        const RESULT = await  this.productCommentRepo.destroy({where:{id}})
        return "Success"
    }
}
