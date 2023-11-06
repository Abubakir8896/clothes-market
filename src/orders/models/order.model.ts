import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import { Payment } from '../../payment/models/payment.model';
import { Product } from '../../product/models/product.model';
import { Customer } from './../../customer/models/customer.model';

interface OrederAttr{
    user_id:number,
    product_id:number
    count:number
    payment_type:string,
    phone:string,
    address:string,
    payment_status:boolean
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrederAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"2", description:"Sotib oliinayotkan product soni"})
    @Column({
        type: DataType.INTEGER
    })
    count: number

    @ApiProperty({example:"3", description:"Productni qaysi usulda sotib olayotkani"})
    @Column({
        type: DataType.STRING
    })
    payment_type: string

    @ApiProperty({example:"true", description:"Productning puli to'langan yoki yoqligi"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    payment_status: boolean

    @ApiProperty({example:"5", description:"Customerning telefon raqami"})
    @Column({
        type: DataType.STRING,
    })
    phone: string

    @ApiProperty({example:"5", description:"Productni qaysi manzilga olib borilishi kerak ekanligi"})
    @Column({
        type: DataType.STRING,
    })
    address: string

    @ForeignKey(()  => Customer)
    @Column({type:DataType.INTEGER})
    user_id:number

    @BelongsTo(() => Customer)
    customer:Customer

    @ForeignKey(()  => Product)
    @Column({type:DataType.INTEGER})
    product_id:number

    @BelongsTo(() => Product)
    product:Product

    @HasMany(() => Payment)
    payment: Payment[]
}
