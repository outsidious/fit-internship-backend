import { ApiProperty } from "@nestjs/swagger";

export class UpdateMeetupDto {
    @ApiProperty({example: 'Расскажем об основах RxJS', description: 'Описание'})
    readonly description: string;

    @ApiProperty({example: new Date(), description: 'Дата проведения'})
    readonly time: Date;
}