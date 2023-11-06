import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import { Brand } from '../../brand/models/brand.model'
import { Order } from '../../orders/models/order.model'
import { ProductCategory } from '../../product_category/models/product_category.model'
import { ProductComment } from '../../product_comments/models/product_comment.model'
import { ProductDiscount } from '../../product_discount/model/product_discount.model'

interface ProductAttr{
    name:string
    price:number
    photo: string
    count:number
    description:string
    product_category_id:number
    size: string
    brend_id:number
    color:string
    type_material:string
    country:string
    number_purchases:number

}

@Table({tableName: 'product'})
export class Product extends Model<Product, ProductAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Koylak", description:"Produstning nomi"})
    @Column({
        type: DataType.STRING
    })
    name: string

    @ApiProperty({example:"800$", description:"Productning narxi"})
    @Column({
        type: DataType.INTEGER
    })
    price: number

    @ApiProperty({example:"image.png", description:"Productning rasmi"})
    @Column({
        type: DataType.STRING,
        unique:true
    })
    photo: string

    @ApiProperty({example:"15", description:"Productning soni"})
    @Column({
        type: DataType.INTEGER
    })
    count: number

    @ApiProperty({example:"Judayam zor koylak", description:"Product xaqida ma'lumot"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    description: string

    @ApiProperty({example:"2", description:"Productning qaysi categoriyaga tegishliligi"})
    @ForeignKey(()  => ProductCategory)
    @Column({type:DataType.INTEGER})
    product_category_id:number

    @BelongsTo(() => ProductCategory)
    product_category:ProductCategory

    @ApiProperty({example:"XL", description:"Productning size"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    size: string

    @ApiProperty({example:"2", description:"Productning qaysi brandga tegishliligi"})
    @ForeignKey(()  => Brand)
    @Column({type:DataType.INTEGER})
    brend_id:number

    @BelongsTo(() => Brand)
    brand:Brand

    @ApiProperty({example:"Qora", description:"Productning rangi"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    color: string

    @ApiProperty({example:"XB", description:"Productning meterial turi"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    type_material: string

    @ApiProperty({example:"Uzbekistan", description:"Productning ishlab chiqarilgan davlati"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    country: string

    @ApiProperty({example:"188", description:"Product shu kungacha necha martta sotilgani"})
    @Column({
        type: DataType.INTEGER,
    })
    number_purchases: number

    @ApiProperty({example:"2023-12-02", description:"Productning  ishlab chiqarilgan sanasi"})
    @Column({
        type: DataType.DATE,
        allowNull:false
    })
    created_day: Date

    @HasMany(() => ProductComment)
    comments: ProductComment[]

    @HasMany(() => ProductDiscount)
    discount: ProductDiscount[]

    @HasMany(() => Order)
    order: Order[]
}
