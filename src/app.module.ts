import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { ProductCommentsModule } from './product_comments/product_comments.module';
import { DiscountModule } from './discount/discount.module';
import { ProductDiscountModule } from './product_discount/product_discount.module';
import { OrdersModule } from './orders/orders.module';
import { Payment } from './payment/models/payment.model';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      models: [],
      autoLoadModels: true,
    }),
    AdminModule,
    RoleModule,
    CustomerModule,
    CategoryModule,
    ProductCategoryModule,
    BrandModule,
    ProductModule,
    ProductCommentsModule,
    DiscountModule,
    ProductDiscountModule,
    OrdersModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
