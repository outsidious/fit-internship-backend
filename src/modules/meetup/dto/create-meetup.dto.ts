import { ApiProperty } from '@nestjs/swagger';

export class CreatedMeetupDto {
  @ApiProperty({ example: 'RxJS', description: 'Название' })
  readonly name: string;

  @ApiProperty({
    example: 'Расскажем об основах RxJS',
    description: 'Описание',
  })
  readonly description: string;

  @ApiProperty({ example: new Date(), description: 'Дата проведения' })
  readonly time: Date;

  @ApiProperty({
    example: 90,
    description: 'Продолжительность митапа в минутах',
  })
  readonly duration: number;

  @ApiProperty({
    example: 'Переговорка 4',
    description: 'Место, где будет проводиться митап',
  })
  location: string;

  @ApiProperty({
    example: 'Разработчики, аналитики',
    description: 'Целевая аудитория',
  })
  target_audience: string;

  @ApiProperty({
    example: 'Ядренную физику',
    description: 'Перечень знаний необходимых для посещения митапа',
  })
  need_to_know: string;

  @ApiProperty({
    example: 'Будем готовить пиццу',
    description: 'Что будет на митапе',
  })
  will_happen: string;

  @ApiProperty({
    example: 'Надо',
    description: 'Причина почему митап нужно обязательно посетить',
  })
  reason_to_come: string;
}
