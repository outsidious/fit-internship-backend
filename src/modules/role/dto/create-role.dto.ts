import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/shared/types/enum/role.enum";

export class CreateRoleDto {
    @ApiProperty({example: RoleEnum.ADMIN, description: 'Название'})
    readonly name: string
}