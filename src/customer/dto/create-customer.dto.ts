import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class CreateCustomerDto {
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

    @ApiProperty({example:'@Eshmat77.gmail.com', description:"Foydalanuvchi emaili"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({example:'+998931208896', description:"Foydalanuvchi Telefon raqami"})
    @IsPhoneNumber('UZ')
    phone:string

    @ApiProperty({example:'IV8521', description:"Foydalanuvchi Passport Raqami"})
    @IsNotEmpty()
    @IsString()
    passport_code:string

    @ApiProperty({example:'Toshkent', description:"Foydalanuvchi Addresi"})
    @IsNotEmpty()
    @IsString()
    addres:string
}