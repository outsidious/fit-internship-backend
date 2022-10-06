import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/auth/roles-auth.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { RoleEnum } from 'src/shared/types/enum/role.enum';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.model';
import { RoleService } from './role.service';

@ApiTags('Работа с ролями')
@Controller('role')
export class RoleController {
    constructor(
        private roleService: RoleService,
    ){}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto): Promise<Role>{
        return this.roleService.create(dto);
    }

    @ApiOperation({summary: 'Получение всех ролей'})
    @ApiResponse({status: 200, type: [Role]})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    getAll(): Promise<Role[]>{
        return this.roleService.getAll();
    }

    @ApiOperation({summary: 'Получение роли по названию'})
    @ApiResponse({status: 200, type: Role})
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Get('/:name')
    getOne(@Param('name') name: string): Promise<Role>{
        return this.roleService.getRoleByName(name);
    }

    @ApiOperation({summary: 'Обновить роль по названию'})
    @ApiResponse({status: 200, type: Role})
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Put()
    update(@Body() dto: UpdateRoleDto): Promise<Role>{
        return this.roleService.update(dto);
    }

    @ApiOperation({summary: 'Удаление роли'})
    @ApiResponse({status: 200, type: [Role]})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Delete('/:name')
    delete(@Param('name') name: string): Promise<Role>{
        return this.roleService.delete(name);
    }
}
