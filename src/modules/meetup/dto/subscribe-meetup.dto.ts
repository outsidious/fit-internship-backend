import { ApiProperty } from "@nestjs/swagger";

export class SubscribeMeetupDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор митапа'})
    readonly idMeetup: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    readonly idUser: number;
}