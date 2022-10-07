import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from 'src/modules/role/role.service';
import { RoleEnum } from 'src/shared/types/enum/role.enum';
import { AddRoleDto } from './dto/add-role.dto';
import { CreatedUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import { UpdateRoleDto } from './dto/update-role-dto';
import { Role } from '../role/role.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RoleService
    ){}

    async createUser(dto: CreatedUserDto): Promise<User>{
        try{
            const userRole = await this.roleService.getRoleByName(RoleEnum.USER);
            const currentUser = await this.userRepository.create(dto);
            await currentUser.$set('roles', [userRole.id]);
            currentUser.roles = [userRole];
            return currentUser;
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllUsers(): Promise<User[]>{
        try{
            return await this.userRepository.findAll({include: 'roles'});
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getUserByEmail(email: string){
        try{
            return await this.userRepository.findOne({where: {email}, include: 'roles'})
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async addRole(dto: AddRoleDto){
        try{
            const currentUser = await this.userRepository.findByPk(dto.userId);
            const currentRole = await this.roleService.getRoleByName(dto.name);
            if (currentUser && currentRole) {
                await currentUser.$add('roles', [currentRole.id]);
                return dto;
            }
            throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async updateRoles(dto: UpdateRoleDto){
        try{
            const currentUser = await this.userRepository.findByPk(dto.userId);
            const currentRoles: Array<Role> = [];

            console.log(dto.names)

            for (const name of dto.names) {
                const role = await this.roleService.getRoleByName(name);
                currentRoles.push(role);
            }

            if (currentUser && currentRoles) {
                console.log(currentUser)
                await currentUser.$set('roles', currentRoles.map(role => role.id));
                return dto;
            }

            throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getUserById(id: number){
        try{
            return await this.userRepository.findByPk(id);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number){
        try{
            const user = await this.userRepository.findByPk(id);
            if (!user) {
                throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
            }
            this.userRepository.destroy({where: {id: user.id}})
            return user;
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, dto: CreatedUserDto){
        try{
            const user = await this.userRepository.findByPk(id);
            if (!user) {
                throw new HttpException("Пользователь не найдена", HttpStatus.NOT_FOUND);
            }
            if (dto.email){
                this.userRepository.update({email: dto.email}, {where: {id}})
                user.email = dto.email
            }
            if (dto.password){
                this.userRepository.update({password: dto.password}, {where: {id}});
            }
            if (dto.fio){
                this.userRepository.update({fio: dto.fio}, {where: {id}})
                user.fio = dto.fio;
            }
            return user;
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }
}
