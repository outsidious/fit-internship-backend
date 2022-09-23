import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";


export class CreatedUserDto {
    @ApiProperty({example: 'jim@dundermifflin.com', description: 'Почта'})
    @IsString({message: 'Почта должна быть строкой'})
    @IsEmail({}, {message: "Некорркктный Email"})
    readonly email: string;

    @ApiProperty({example: 'password', description: 'Пароль'})
    @IsString({message: 'Пароль должне быть строкой'})
//    @Length(6, 20, {message: 'Пароль не должен быть меньше 6 и больше 20'})
    readonly password: string;

    @ApiProperty({example: 'fio', description: 'ФИО пользователя'})
    readonly fio: string;
}