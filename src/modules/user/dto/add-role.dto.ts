import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/shared/types/enum/role.enum";

export class AddRoleDto {
    @ApiProperty({example: RoleEnum.ADMIN, description: 'Название роли'})
    readonly name: string;

    @ApiProperty({example: '1', description: 'id пользователя, которому добавляем роль'})
    readonly userId: number;
}