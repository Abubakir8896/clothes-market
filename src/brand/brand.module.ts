import { Module } from '@nestjs/common';
import { FileModule } from '../files/file.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from './models/brand.model';


@Module({
  imports:[SequelizeModule.forFeature([Brand]),JwtModule.register({}),FileModule],
  controllers:[BrandController],
  providers: [BrandService],
  exports:[BrandService]
})
export class BrandModule {}
