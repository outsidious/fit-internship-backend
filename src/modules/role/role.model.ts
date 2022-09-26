import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RoleEnum } from "src/shared/types/enum/role.enum";
import { User } from "src/modules/user/user.model";

interface UserCreateAttrs {
    name: string,
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, UserCreateAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true,})
    id: number

    @ApiProperty({example: RoleEnum.ADMIN, description: 'Название роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @ApiProperty({ type: () => [Role], description: 'Список ролей, принадлежащих пользователю'})
    @BelongsToMany(() => Role, () => UserRole)
    users: Role[]
}

@Table({tableName: 'user-role'})
export class UserRole extends Model<UserRole> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => User)
    userId: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Role)
    roleId: number;
}