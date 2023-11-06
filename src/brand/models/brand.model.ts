import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'
import { Product } from '../../product/models/product.model';

interface BrandAttr{
name:string;
image:string
}

@Table({tableName: 'brand'})
export class Brand extends Model<Brand, BrandAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Nike", description:"Brand Nomi"})
    @Column({
        type: DataType.STRING
    })
    name: string;

    
    @ApiProperty({example:"image.png", description:"Brandning rasmi"})
    @Column({
        type: DataType.STRING
    })
    image: string;

    @HasMany(() => Product)
    products: Product[]
}
