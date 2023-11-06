import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example:'iPhone 13 pro', description:"Productning nomi"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:'Xotira 256, Yomkost 92%, Rangi: qora', description:"Productn xaqida ma'lumot"})
    @IsString()
    description:string

    @ApiProperty({example:'800$', description:"Productning narxi"})
    @IsNotEmpty()
    price:number

    @ApiProperty({example:'15', description:"Productning soni"})
    @IsNotEmpty()
    count:number

    @ApiProperty({example:'1', description:"Productning qaysi categoriyaga tegishliligi"})
    @IsNotEmpty()
    product_category_id:number

    @ApiProperty({example:'200$', description:"Praductning qaysi brend ishlab chiqargani"})
    @IsNotEmpty()
    brend_id:number

    @ApiProperty({example:'200$', description:"Praductning size"})
    @IsNotEmpty()
    size: string


    @ApiProperty({example:'200$', description:"Praductning boshlang'ich to'lovi"})
    @IsNotEmpty()
    color:string


    @ApiProperty({example:'200$', description:"Praductning rangi"})
    @IsNotEmpty()
    type_material:string


    @ApiProperty({example:'200$', description:"Praductning ishlab chiqarilgan davlati"})
    @IsNotEmpty()
    country:string
    

    @ApiProperty({example:'2023-12-01', description:"Praductning ishlab chiqarilgan sanasi"})
    @IsNotEmpty()
    @IsDateString()
    created_day:Date
}
