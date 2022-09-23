import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/shared/types/enum/role.enum";

export class UpdateRoleDto {
    @ApiProperty({example: RoleEnum.ADMIN, description: 'Старое название'})
    readonly oldName: string

    @ApiProperty({example: RoleEnum.ADMIN, description: 'Новое название'})
    readonly newName: string
}