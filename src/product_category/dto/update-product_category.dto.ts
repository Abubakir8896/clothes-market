import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateProductCategoryDto {
    @ApiProperty({example:'Koylak', description:"Productning categorysi"})
    @IsNotEmpty()
    @IsString()
    name?:string

    @ApiProperty({example:'1', description:"ProductCategoryni Categorysi"})
    @IsNotEmpty()
    @IsNumber()
    category_id?:number
}
