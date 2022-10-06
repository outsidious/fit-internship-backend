import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/auth/roles-auth.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { RoleEnum } from 'src/shared/types/enum/role.enum';
import { AddRoleDto } from './dto/add-role.dto';
import { CreatedUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('Работа с пользователями')
@Controller('user')
export class UserController {
    constructor(
        private usersService: UserService,
    ){}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    @UsePipes(ValidationPipe)
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    create(@Body() dto: CreatedUserDto){
        console.log(dto)
        return this.usersService.createUser(dto)
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Выдача ролей'})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @ApiResponse({status: 200, type: User})
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Put('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Обновление пользователя'})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @ApiResponse({status: 200, type: User})
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Put('/:id')
    update(@Param('id') id: number, @Body() dto: CreatedUserDto){
        return this.usersService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiHeader({
        name: 'Authorization',
        description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN}`,
        required: true
    })
    @ApiResponse({status: 200, type: User})
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.usersService.delete(id);
    }
}
