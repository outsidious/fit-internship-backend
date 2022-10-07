import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/shared/types/enum/role.enum";

export class UpdateUserRoleDto {
    @ApiProperty({example: [RoleEnum.ADMIN, RoleEnum.USER], description: 'Массив ролей'})
    readonly names: string[];

    @ApiProperty({example: '1', description: 'id пользователя, которому добавляем роль'})
    readonly userId: number;
}