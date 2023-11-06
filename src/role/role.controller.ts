import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
 import { CreaterAdminGuard } from '../guards/admin.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './model/role.model';
import { RoleService } from './role.service';

@ApiTags("Role")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService:RoleService){}

    @ApiOperation({summary:"Create Role"})
     @UseGuards(CreaterAdminGuard)
    @Post('create')
    async createRole(@Body() createRoleDto:CreateRoleDto):Promise<Role>{
        return this.roleService.createRole(createRoleDto)    
    }

     @UseGuards(CreaterAdminGuard)
    @ApiOperation({summary:"Get All Roles"})
    @ApiResponse({status:200, description:"List of Roles", type:[Role]})
    @Get('all')
    async findAllCompany():Promise<Role[]>{
        return this.roleService.findAllRoles()
    }

    @ApiOperation({summary:"Get Role By ID"})
    @ApiResponse({status:200, description:"List of Role", type:[Role]})
     @UseGuards(CreaterAdminGuard)
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Role>{
        return this.roleService.findById(+id)
    }

    @ApiOperation({summary:"Delete Role"})
    @ApiResponse({status:200, description:"Success", type:[Role]})
    @UseGuards(CreaterAdminGuard)
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.roleService.deleteById(+id)
    }
    
    @ApiOperation({summary:"Update Role"})
    @UseGuards(CreaterAdminGuard)
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateRoleDto:UpdateRoleDto){
        return this.roleService.updateById(+id,updateRoleDto)
    }
}
