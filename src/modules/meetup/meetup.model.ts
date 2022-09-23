import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/user.model';

interface MeetupCreateAttrs {
  name: string;
  description: string;
  time: Date;
  createdBy: number;
}

@Table({ tableName: 'meetup' })
export class Meetup extends Model<Meetup, MeetupCreateAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'RxJS', description: 'Название' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Расскажем об основах RxJS',
    description: 'Описание',
  })
  @Column({ type: DataType.STRING({length: 500}), allowNull: true})
  description: string;

  @ApiProperty({ example: 'Переговорка 4', description: 'Описание' })
  @Column({ type: DataType.STRING, allowNull: true })
  location: string;

  @ApiProperty({
    example: 'Разработчики, аналитики',
    description: 'Целевая аудитория',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  target_audience: string;

  @ApiProperty({
    example: 'Ядренную физику',
    description: 'Перечень знаний необходимых для посещения митапа',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  need_to_know: string;

  @ApiProperty({
    example: 'Будем готовить пиццу',
    description: 'Что будет на митапе',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  will_happen: string;

  @ApiProperty({
    example: 'Надо',
    description: 'Причина почему митап нужно обязательно посетить',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  reason_to_come: string;

  @ApiProperty({ example: new Date(), description: 'Дата проведения' })
  @Column({ type: DataType.DATE, allowNull: false })
  time: Date;

  @ApiProperty({
    example: 90,
    description: 'Продолжитлеьность митапа в минутах',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  duration: number;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя, создавшего митап',
  })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  createdBy: number;

  @BelongsTo(() => User)
  owner: User;

  @BelongsToMany(() => User, () => UserMeetup)
  users: User[];
}

@Table({ tableName: 'user-meetup' })
export class UserMeetup extends Model<UserMeetup> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  userId: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Meetup)
  meetupId: number;
}
