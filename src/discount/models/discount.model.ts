import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'
import { ProductCategory } from '../../product_category/models/product_category.model';
import { ProductDiscount } from '../../product_discount/model/product_discount.model';

interface DiscountAttr{
name:string;
description:string,
persantage:number
}

@Table({tableName: 'discount'})
export class Discount extends Model<Discount, DiscountAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Omadli", description:"Discountning nomi"})
    @Column({
        type: DataType.STRING
    })
    name: string;

    @ApiProperty({example:"Omadlilar uchun", description:"Discount xaqida ma'lumot"})
    @Column({
        type: DataType.STRING
    })
    description: string;

    
    @ApiProperty({example:"50", description:"Discount foizi"})
    @Column({
        type: DataType.INTEGER
    })
    persantage: number;

    @HasMany(() => ProductDiscount)
    product: ProductDiscount[]
}
