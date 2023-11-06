import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType,  ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import { Category } from '../../category/models/category.model';
import { Product } from '../../product/models/product.model';

interface Product_CategoryAttr{
name:string;
category_id:number
}

@Table({tableName: 'product_category'})
export class ProductCategory extends Model<ProductCategory, Product_CategoryAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Koylak", description:"Productning categorysi"})
    @Column({
        type: DataType.STRING
    })
    name: string;

    @ForeignKey(()  => Category)
    @Column({type:DataType.INTEGER})
    category_id:number

    @BelongsTo(() => Category)
    category:Category

    @HasMany(() => Product)
    products: Product[]
}
