import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString} from "class-validator";

export class UpdateProductDiscountDto {
    @ApiProperty({example:'Eshmat', description:"Brand nomi"})
    @IsNotEmpty()
    product_id:number

    @ApiProperty({example:'Eshmat', description:"Brand nomi"})
    @IsNotEmpty()
    discount_id:number

    @ApiProperty({example:'Eshmat', description:"Brand nomi"})
    @IsNotEmpty()
    @IsDate()
    start_date:Date

    @ApiProperty({example:'Eshmat', description:"Brand nomi"})
    @IsNotEmpty()
    @IsDate()
    end_date:Date

    @ApiProperty({example:'Eshmat', description:"Brand nomi"})
    @IsString()
    description:string
}
