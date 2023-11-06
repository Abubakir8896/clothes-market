import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString} from "class-validator";

export class CreateProductDiscountDto {
    @ApiProperty({example:'1', description:"Qaysi Productka"})
    @IsNotEmpty()
    product_id:number

    @ApiProperty({example:'1', description:"Qaysi Discount"})
    @IsNotEmpty()
    discount_id:number

    @ApiProperty({example:'2023-01-10', description:"Boshlanadigan sana"})
    @IsNotEmpty()
    @IsDateString()
    start_date:Date

    @ApiProperty({example:'2023-01-10', description:"Tugaydigan sana"})
    @IsNotEmpty()
    @IsDateString()
    end_date:Date

    @ApiProperty({example:'wrtvwvtwrvtwrtvr', description:"Ma'lumot Discount xaqida"})
    @IsString()
    description:string
}
