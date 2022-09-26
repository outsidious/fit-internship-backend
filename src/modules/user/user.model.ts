import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Meetup, UserMeetup } from "src/modules/meetup/meetup.model";
import { Role, UserRole } from "src/modules/role/role.model";

interface UserCreateAttrs {
    email: string,
    password: string,
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @ApiProperty({example: 'pam@dundermifflin.com', description: 'Почта'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: 'password', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: 'password', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    fio: string

    @ApiProperty({ type: () => [Role], description: 'Список ролей, принадлежащих пользователю'})
    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]

    @ApiProperty({ type: () => [Meetup], description: 'Митапы, созданные пользователем.'})
    @HasMany(() => Meetup)
    meetupsCteaterByUser: Meetup[];

    @ApiProperty({ type: () => [Meetup], description: 'Митапы, на которые подписан пользователь.'})
    @BelongsToMany(() => Meetup, () => UserMeetup)
    meetups: Meetup[]
}