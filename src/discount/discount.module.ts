import { SequelizeModule} from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { Discount } from './models/discount.model';

@Module({
  imports:[SequelizeModule.forFeature([Discount]),
  JwtModule.register({})],
controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}