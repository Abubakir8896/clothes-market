import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { Discount } from '../../discount/models/discount.model';
import { Product } from '../../product/models/product.model';
import { ProductCategory } from '../../product_category/models/product_category.model';

interface ProductDiscountAttr{
    discount_id:number;
    product_id:number;
    start_date:Date;
    end_date:Date;
    description:string;
}

@Table({tableName: 'productDiscount'})
export class ProductDiscount extends Model<ProductDiscount, ProductDiscountAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ForeignKey(()  => Discount)
    @Column({type:DataType.INTEGER})
    discount_id:number

    @BelongsTo(() => Discount)
    discount:Discount


    @ForeignKey(()  => Product)
    @Column({type:DataType.INTEGER})
    product_id:number

    @BelongsTo(() => Product)
    product:Product


    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    start_date:Date;


    @Column({
        type:DataType.DATE,
        allowNull:true
    })
    end_date:Date;
    

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    description:string;
}
