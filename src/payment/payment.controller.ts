import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';
import { CustomerGuard } from '../guards/customer.guard';

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({summary:"Create Payment"})
  @UseGuards(CustomerGuard)
  @Post("create-card")
  create(@Body() createPaymentCardDto: CreatePaymentCardDto, @Req() req:Request) {
    return this.paymentService.createPayment(createPaymentCardDto, req);
  }

  @ApiOperation({summary:"Get All History"})
  @ApiResponse({status:200, description:"List of Products", type:[Payment]})
  @Get()
  findAll() {
    return this.paymentService.findAllPayments();
  }

  @ApiOperation({summary:"Get History by id"})
  @ApiResponse({status:200, description:"List of Product", type:[Payment]})
  @Get('one')
  findOne(@Req() req:Request) {
    return this.paymentService.findById(req);
  }
}
