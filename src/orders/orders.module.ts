import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { Order } from './models/order.model';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports:[SequelizeModule.forFeature([Order]),
  JwtModule.register({})],
controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}