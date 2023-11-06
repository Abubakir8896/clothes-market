import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateBrandDto {
    @ApiProperty({example:'Nike', description:"Brand nomi"})
    @IsNotEmpty()
    @IsString()
    name:string
}
