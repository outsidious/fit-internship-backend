import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreatedUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}
    
    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 200})
    @ApiResponse({status: 401})
    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: CreatedUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 200})
    @ApiResponse({status: 400})
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreatedUserDto){
        return this.authService.registration(userDto)
    }
}
