import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { ProductCommentsService } from './product_comments.service';
import { CreateProductCommentDto } from './dto/create-product_comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductComment } from './models/product_comment.model';
import { AdminCustomerGuard } from '../guards/Customer-Admin.guard';
import { CreaterAdminGuard } from '../guards/admin.guard';

@ApiTags("product_comments")
@Controller('product-comment')
export class ProductCommentsController {
  constructor(private readonly productCommentsService: ProductCommentsService) {}

  @ApiOperation({summary: 'Create Comment'})
  @ApiResponse({status: 200, type: ProductComment})
  @Post('create')
  create(@Body() createProductCommentDto: CreateProductCommentDto, @Req() req: Request,) {
    return this.productCommentsService.createComment(createProductCommentDto,req);
  }

  @ApiOperation({summary: 'Get All Comments'})
  @ApiResponse({status:200, description:"List of Comments", type:[ProductComment]})
  @UseGuards(CreaterAdminGuard)
  @Get('all')
  findAll() {
    return this.productCommentsService.findAllComments();
  }

  @ApiOperation({summary: 'Delete ID'})
  @ApiResponse({status: 200, type: ProductComment})
  @UseGuards(AdminCustomerGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.productCommentsService.deleteById(+id, req);
  }
}
