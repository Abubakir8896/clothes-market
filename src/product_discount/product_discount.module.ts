import { Module } from '@nestjs/common';
import { FileModule } from '../files/file.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ProductDiscountController } from './product_discount.controller';
import { ProductDiscountService } from './product_discount.service';
import { ProductDiscount } from './model/product_discount.model';


@Module({
  imports:[SequelizeModule.forFeature([ProductDiscount]),JwtModule.register({})],
  controllers:[ProductDiscountController],
  providers: [ProductDiscountService],
  exports:[ProductDiscountService]
})
export class ProductDiscountModule {}
