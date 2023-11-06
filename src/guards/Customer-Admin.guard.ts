import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Customer } from "../customer/models/customer.model";
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from "../admin/models/admin.model";


@Injectable()
export class AdminCustomerGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'Customer is not authorized' });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if(bearer != 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Customer is not authorized' });
    }
    try {
      async function verify(token: string, jwtService: JwtService) {
        const customer: Partial<Customer> = await jwtService.verifyAsync(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
  
      if(!customer) {
        throw new UnauthorizedException({ message: 'Customer is not authorized' });
      }
      
      const admin = await Admin.findOne({where:{id:customer.id}})
      const user = await Customer.findOne({where:{id:customer.id}})
          if(!user && !admin){
            throw new UnauthorizedException({ message: 'Customer is not found' });
          }
          
      const active = await Customer.findOne({where:{id:customer.id}})
    
      if(!active.is_active && !admin.is_active) {
        throw new UnauthorizedException({ message: 'Customer is not active' });
      }
      return true;
    }
    return verify(token, this.jwtService);
    } catch (error) {
      throw new UnauthorizedException({message:error.message})
    }
  }
}