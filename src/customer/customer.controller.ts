import { Controller, Get, Post, Body,Param,Res, UseGuards, HttpCode, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './models/customer.model';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { CustomerGuard } from '../guards/customer.guard';
import { FindCustomerDto } from './dto/find-customer.dto';
import { LoginDto } from './dto/customer-login.dto';
import { CreaterAdminGuard } from '../guards/admin.guard';
import { Admin } from './../admin/models/admin.model';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordCustomerDto } from './dto/UpdatePasswordCustomer.dto';

@ApiTags("Customer")
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({summary: 'register Customer'})
  @ApiResponse({status: 201, type: Customer})
  @Post('signup')
  async registration(@Body() createCustoomerDto: CreateCustomerDto,
  @Res({passthrough: true}) res: Response){
    return this.customerService.registration(createCustoomerDto, res)
  }

    //-------------------------------------------------

  @ApiOperation({summary:"Activate Cutomer"})
  @Get('activate/:link')
  activate(@Param('link') link:string){
    return this.customerService.activate(link);
  };
    
  //----------------------------------------------------

  @UseGuards(CustomerGuard)
  @ApiOperation({summary:'logout User'})
  @ApiResponse({status:200, type:Customer})
  @Post('logout')
  logout(@CookieGetter('refresh_token') refreshToken:string,
  @Res({passthrough:true}) res:Response,
  ){return this.customerService.logout(refreshToken,res)}
  
//-------------------------------------------------------

  @ApiOperation({summary:"Activate token with refresh"})
  @Post(":id/refresh")
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken:string,
    @Res({passthrough:true}) res:Response
  ){
    return this.customerService.refreshToken(+id, refreshToken, res);
  }

  //---------------------------------------------------------

  @ApiOperation({summary:"Find Cutomers"})
  @UseGuards(CreaterAdminGuard)
  @Post("find")
  findAll(@Body() findUserDto: FindCustomerDto){
    return this.customerService.findAll
    (findUserDto)
  }

  //----------------------------------------------------------

  @ApiOperation({summary:"Customer Logout"})
  @Post('signin')
    login(
        @Body() loginDto:LoginDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.customerService.login(loginDto,res)
    }

    //---------------------------------------------------------

    @ApiOperation({summary:"Get All Customers"})
    @ApiResponse({status:200, description:"List od Customer", type:[Customer]})
    @UseGuards(CreaterAdminGuard)
    @Get('all')
    async findAllCompany():Promise<Customer[]>{
        return this.customerService.findAllCustomers()
    }

    //----------------------------------------------------------

    @ApiOperation({summary:"Get One Customer"})
    @ApiResponse({status:200, description:"List of Customer", type:[Customer]})
    @UseGuards(CustomerGuard)
    @Get('one/:id')
    async getOneCustomer(@Param('id') id:string):Promise<Customer>{
      return this.customerService.findById(+id);
    }

    //-----------------------------------------------------------
    @ApiOperation({summary: 'Update Customer by ID'})
    @ApiResponse({status: 200, type: Admin})
    @UseGuards(CustomerGuard)
    @Put('update')
    updateAdminById (@Body() updateCustomerDto: UpdateCustomerDto, @Req() req: Request,) {
      return this.customerService.updateAdminById(updateCustomerDto, req)
    }

    @ApiOperation({summary: 'CHANGE PASSWORD ADMIN '})
    @ApiResponse({status: 200, description: "True if UPDATED!"})
    @UseGuards(CustomerGuard)
    @Put('change-password')
    changePassword (
      @Body() updatePasswordCustomerDto: UpdatePasswordCustomerDto,
      @Req() req: Request,
      ) {
      return this.customerService.changePassword(updatePasswordCustomerDto, req);
    }
}

