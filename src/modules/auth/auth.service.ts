import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreatedUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/modules/user/user.model';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async login(userDto: CreatedUserDto){
        try{
            const user = await this.validationUser(userDto);
            return this.generateToken(user);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async registration(userDto: CreatedUserDto){
        try{
            const currentUser = await this.userService.getUserByEmail(userDto.email);
            if (currentUser) {
                throw new HttpException('Пользователь с таким ником уже есть', HttpStatus.BAD_REQUEST);
            }
            const user = await this.userService.createUser({...userDto});
            return this.generateToken(user);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    private async validationUser(userDto: CreatedUserDto){
        const currentUser = await this.userService.getUserByEmail(userDto.email);
        const passwordEqual = await bcrypt.compare(userDto.password, currentUser.password);
        if (currentUser && passwordEqual){
            return currentUser;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'});
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
