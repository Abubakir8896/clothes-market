import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateRoleDto {
    @ApiProperty({example:'Eshmat', description:"Foydalanuvchi ismi"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:'Eshmatov', description:"Foydalanuvchi familiyasi"})
    @IsNotEmpty()
    @IsString()
    description:string
}
