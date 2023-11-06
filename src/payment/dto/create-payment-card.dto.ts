import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";

export class CreatePaymentCardDto {
    @ApiProperty({example:'1', description:"Qaysi Produktni uchun"})
    @IsNotEmpty()
    order_id:number

    @ApiProperty({example:'150', description:"Karta Raqami"})
    @IsNotEmpty()
    card_number:string

    @ApiProperty({example:'Karta', description:"Karta egasini ism familiyasi"})
    @IsNotEmpty()
    card_holder_name:string

    @ApiProperty({example:'Karta', description:"Kartaning Codi"})
    @IsNotEmpty()
    Pincode:string

    @ApiProperty({example:'Karta', description:"Kartani yaroqsizga aylanish muddati"})
    @IsNotEmpty()
    @IsDateString()
    expired_year:Date
}
