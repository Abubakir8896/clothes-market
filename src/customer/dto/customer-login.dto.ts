import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class LoginDto {
    @ApiProperty({example:'Eshmat', description:"Foydalanuvchi ismi"})
    @IsNotEmpty()
    @IsString()
    first_name:string

    @ApiProperty({example:'Eshmatov', description:"Foydalanuvchi familiyasi"})
    @IsNotEmpty()
    @IsString()
    last_name:string

    @ApiProperty({example:'Eshmat77', description:"Foydalanuvchi username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty({example:'confirm password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    confirm_password:string
}
