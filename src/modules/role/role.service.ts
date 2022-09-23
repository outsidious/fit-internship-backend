import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEnum } from 'src/shared/types/enum/role.enum';
import { Role } from './role.model';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role) private roleReposotory: typeof Role,
    ){}

    async create(dto: CreateRoleDto): Promise<Role>{
        try {
            return await this.roleReposotory.create(dto);   
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getAll(): Promise<Role[]>{
        try {
            return await this.roleReposotory.findAll();
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getRoleByName(name: string): Promise<Role>{
        try{
            return await this.roleReposotory.findOne({where: {name}})
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(name: string): Promise<Role>{
        try{
            if (name === RoleEnum.ADMIN) {
                throw new HttpException("Вы пытались удалить роль ADMIN. Может быть у вас забрать админские права", HttpStatus.BAD_REQUEST);
            }
            const role = await this.getRoleByName(name);
            if (!role) {
                throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
            }
            this.roleReposotory.destroy({where: {id: role.id}})
            return role;
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async update(dto: UpdateRoleDto): Promise<Role>{
        try{
            if (dto.oldName === RoleEnum.ADMIN) {
                throw new HttpException("Вы пытались изменить роль ADMIN. Может быть у вас забрать админские права", HttpStatus.BAD_REQUEST);
            }
            const role = await this.getRoleByName(dto.oldName);
            if (!role) {
                throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
            }
            if (dto.newName){
                this.roleReposotory.update({name: dto.newName}, {where: {id: role.id}})
                role.name = dto.newName;
            }
            return role;
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }
}
