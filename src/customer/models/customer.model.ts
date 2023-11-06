import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'
import { Order } from '../../orders/models/order.model'
import { Payment } from '../../payment/models/payment.model'
import { ProductComment } from '../../product_comments/models/product_comment.model'

interface CustomerAttr{
    first_name: string
    last_name: string
    username: string
    hashed_password: string
    email: string
    phone: string
    passport_code:string
    user_photo: string
    is_active:boolean
    adress:string
    hashed_refresh_token:string,
    activation_link:string
}

@Table({tableName: 'customers'})
export class Customer extends Model<Customer, CustomerAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Eshmat", description:"Foydalanuvchining ismi"})
    @Column({
        type: DataType.STRING
    })
    first_name: string

    @ApiProperty({example:"Eshmatov", description:"Foydalanuvchining Familiyasi"})
    @Column({
        type: DataType.STRING
    })
    last_name: string

    @ApiProperty({example:"Eshmat77", description:"Foydalanuvchining username"})
    @Column({
        type: DataType.STRING,
        unique:true
    })
    username: string

    @ApiProperty({example:"^%$#EWRTYUIOKJHGFDSERTYU#$%", description:"Foydalanuvchining Hashlangan passwordi"})
    @Column({
        type: DataType.STRING
    })
    hashed_password: string

    @ApiProperty({example:"Abubakir.zikirov8896@gmail.com", description:"Foydalanuvchining emaili"})
    @Column({
        type: DataType.STRING,
    })
    email: string

    @ApiProperty({example:"image.png", description:"Foydalanuvchining rasmi"})
    @Column({
        type: DataType.STRING
    })
    user_photo: string

    @ApiProperty({example:"+998931208896", description:"Foydalanuvchining Telefon raqami"})
    @Column({
        type: DataType.STRING,
    })
    phone: string

    @ApiProperty({example:"IV2584", description:"Foydalanuvchining passport raqami"})
    @Column({
        type: DataType.STRING,
    })
    passport_code: string


    @ApiProperty({example:"true", description:"Foydalanuvchi tasdiqlangan xolati"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    is_active: boolean
    
    @ApiProperty({example:"token", description:"hashlandan tokeni"})
    @Column({
        type: DataType.STRING
    })
    hashed_refresh_token: string
    
    @Column({
        type: DataType.STRING,
    })
    activation_link:string


    @ApiProperty({example:"Shamsobod.MFY Boxor 4 uy", description:""})
    @Column({
        type: DataType.STRING
    })
    addres:string

    @HasMany(() => ProductComment)
    comment: ProductComment[]

    @HasMany(() => Order)
    orders: Order[]

    @HasMany(() => Payment)
    payments: Payment[]
}

