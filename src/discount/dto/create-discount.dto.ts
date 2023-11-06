import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreateDiscountDto {
    @ApiProperty({example:'Omadli', description:"Discount nomi"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:'Omadli odamlar uchun', description:"Discount xaqida ma'lumot"})
    @IsString()
    description:string

    @ApiProperty({example:'50', description:"Discount foizi"})
    @IsNotEmpty()
    persantage:number
}
