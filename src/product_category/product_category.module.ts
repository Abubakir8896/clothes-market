import { SequelizeModule} from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { ProductCategory } from './models/product_category.model';

@Module({
  imports:[SequelizeModule.forFeature([ProductCategory]),
  JwtModule.register({})],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}