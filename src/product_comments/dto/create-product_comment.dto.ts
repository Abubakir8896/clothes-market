import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreateProductCommentDto {
    @ApiProperty({example:'1', description:"Productning ID"})
    @IsNotEmpty()
    product_id:number

    @ApiProperty({example:'Zor', description:"Comment"})
    @IsNotEmpty()
    @IsString()
    text:string
}
