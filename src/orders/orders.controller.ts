import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from '../guards/customer.guard';
import { CreaterAdminGuard } from '../guards/admin.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';
import { OrderService } from './orders.service';

@ApiTags("Order")
@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}

    @ApiOperation({summary:"Create Order"})
    @UseGuards(CustomerGuard)
    @Post('create')
    async createRole(@Body() createRoleDto:CreateOrderDto, @Req() req:Request):Promise<Order>{
        return this.orderService.create(createRoleDto, req)    
    }

    @ApiOperation({summary:"Get All Orders"})
    @ApiResponse({status:200, description:"List of Orders", type:[Order]})
    @UseGuards(CreaterAdminGuard)
    @Get('all')
    async findAllCompany():Promise<Order[]>{
        return this.orderService.findAllOrders()
    }

    @ApiOperation({summary:"Get Order by id"})
    @UseGuards(CustomerGuard)
    @ApiResponse({status:200, description:"List of Order", type:[Order]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Order>{
        return this.orderService.findById(+id)
    }
}