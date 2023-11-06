import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductCategoryDto {
    @ApiProperty({example:'Koylak', description:"Productning nomi"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:'1', description:"ProductCategoryni Categorysi"})
    @IsNotEmpty()
    @IsNumber()
    category_id:number
}
