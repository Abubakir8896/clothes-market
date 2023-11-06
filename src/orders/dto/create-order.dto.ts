import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({example:'1', description:"Qaysi Produktni sotib olayotkani"})
    @IsNotEmpty()
    product_id:number

    @ApiProperty({example:'15', description:"Productning soni"})
    @IsNotEmpty()
    count:number

    @ApiProperty({example:'1', description:"Productni pulini qaysi usulda to'lashi"})
    @IsNotEmpty()
    payment_type:string

    @ApiProperty({example:'5', description:"Customernin telefon raqami"})
    @IsNotEmpty()
    phone:string

    @ApiProperty({example:'5', description:"Qaysi manzilga olib borilishi kerak ekanligi"})
    @IsNotEmpty()
    address:string
}
