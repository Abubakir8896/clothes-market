import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileModule } from '../files/file.module';
import { Product } from './models/product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[SequelizeModule.forFeature([Product]),JwtModule.register({}),FileModule],
  controllers:[ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
