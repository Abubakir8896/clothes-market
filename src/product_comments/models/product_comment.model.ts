import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { Customer } from '../../customer/models/customer.model';
import { Product } from '../../product/models/product.model';
import { ProductCategory } from '../../product_category/models/product_category.model';

interface ProductCommentAttr{
user_id:number;
product_id:number,
text:string
}

@Table({tableName: 'productComment'})
export class ProductComment extends Model<ProductComment, ProductCommentAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ForeignKey(()  => Customer)
    @Column({type:DataType.INTEGER})
    user_id:number

    @BelongsTo(() => Customer)
    user:Customer


    @ForeignKey(()  => Product)
    @Column({type:DataType.INTEGER})
    product_id:number

    @BelongsTo(() => Product)
    product:Product

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    text:string;
}
