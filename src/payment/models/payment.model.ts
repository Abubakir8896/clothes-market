import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { Order } from '../../orders/models/order.model';
import { Product } from '../../product/models/product.model';
import { Customer } from './../../customer/models/customer.model';

interface PaymentAttr{
    user_id:number,
    order_id:number
    card_number:string;
    card_holder_name:string;
    Pincode:string;
    expired_year:Date   
}

@Table({tableName: 'payment'})
export class Payment extends Model<Payment, PaymentAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Karta", description:"Tolovni tolash ushuli"})
    @Column({
        type: DataType.STRING,
    })
    card_number: string

    @ApiProperty({example:"150", description:"Tolov summasi"})
    @Column({
        type: DataType.STRING,
    })
    card_holder_name: string

    @ApiProperty({example:"150", description:"Tolov summasi"})
    @Column({
        type: DataType.STRING,
    })
    Pincode: string

    @ApiProperty({example:"150", description:"Tolov summasi"})
    @Column({
        type: DataType.DATE,
    })
    expired_year: Date

    @ForeignKey(()  => Customer)
    @Column({type:DataType.INTEGER})
    user_id:number

    @BelongsTo(() => Customer)
    customer:Customer

    @ForeignKey(()  => Order)
    @Column({type:DataType.INTEGER})
    order_id:number

    @BelongsTo(() => Order)
    order:Order
}
