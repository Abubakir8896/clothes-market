import { SequelizeModule} from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductCommentsService } from './product_comments.service';
import { ProductComment } from './models/product_comment.model';
import { ProductModule } from '../product/product.module';
import { ProductCommentsController } from './product_comments.controller';


@Module({
  imports:[SequelizeModule.forFeature([ProductComment]),
  JwtModule.register({}),ProductModule],
  controllers: [ProductCommentsController],
  providers: [ProductCommentsService],
})
export class ProductCommentsModule {}