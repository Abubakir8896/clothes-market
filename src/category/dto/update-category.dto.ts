import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({example:'Koylak', description:"Categoryning nomi"})
    @IsNotEmpty()
    @IsString()
    name:string
}
