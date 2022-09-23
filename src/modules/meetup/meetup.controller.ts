import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/auth/roles-auth.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { RoleEnum } from 'src/shared/types/enum/role.enum';
import { CreatedMeetupDto } from './dto/create-meetup.dto';
import { SubscribeMeetupDto } from './dto/subscribe-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { Meetup } from './meetup.model';
import { MeetupService } from './meetup.service';
import { MeetupsGuard } from './meetups.guard';

@ApiTags('Управление митапами')
@Controller('meetup')
export class MeetupController {
  constructor(private meetupService: MeetupService) {}

  @ApiOperation({ summary: 'Создание митапа' })
  @ApiResponse({ status: 200, type: Meetup })
  @ApiHeader({
    name: 'Authorization',
    description: `Токен авторизованного пользователя. Роут доступен для ролей ${Object.values(
      RoleEnum,
    ).join(', ')}`,
    required: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreatedMeetupDto, @Request() req): Promise<Meetup> {
    return this.meetupService.create(dto, req);
  }

  @ApiOperation({ summary: 'Получение всех митапов' })
  @ApiResponse({ status: 200, type: [Meetup] })
  @ApiHeader({
    name: 'Authorization',
    description: `Токен авторизованного пользователя. Роут доступен для ролей ${Object.values(
      RoleEnum,
    ).join(', ')}`,
    required: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<Meetup[]> {
    return this.meetupService.getAll();
  }

  @ApiOperation({ summary: 'Изменить митап' })
  @ApiResponse({ status: 200, type: Meetup })
  @ApiHeader({
    name: 'Authorization',
    description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN} и пользователю, создавшему метап`,
    required: true,
  })
  //   @Roles(RoleEnum.ADMIN)
  @UseGuards(/*RolesGuard, */ MeetupsGuard)
  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() dto: CreatedMeetupDto,
  ): Promise<Meetup> {
    console.log('ok');
    return this.meetupService.update(id, dto);
  }

  @ApiOperation({ summary: 'Подписать пользователя на митап' })
  @ApiResponse({ status: 200, type: Meetup })
  @ApiHeader({
    name: 'Authorization',
    description: `Токен авторизованного пользователя. Роут доступен для ролей ${Object.values(
      RoleEnum,
    ).join(', ')}`,
    required: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @UseGuards(RolesGuard)
  @Put()
  subscribeToMeetup(
    @Body() dto: SubscribeMeetupDto,
  ): Promise<Meetup> {
    return this.meetupService.addUser(dto);
  }

  @ApiOperation({ summary: 'Отписка пользователя от митапа' })
  @ApiResponse({ status: 200, type: Meetup })
  @ApiHeader({
    name: 'Authorization',
    description: `Токен авторизованного пользователя. Роут доступен для ролей ${Object.values(
      RoleEnum,
    ).join(', ')}`,
    required: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @UseGuards(RolesGuard)
  @Delete()
  unsubscribeToMeetup(
    @Body() dto: SubscribeMeetupDto,
  ): Promise<Meetup> {
    return this.meetupService.dellUser(dto);
  }

  @ApiOperation({ summary: 'Удаление митапа' })
  @ApiResponse({ status: 200, type: Meetup })
  @ApiHeader({
    name: 'Authorization',
    description: `Токен авторизованного пользователя. Роут доступен для роли ${RoleEnum.ADMIN} и пользователю, создавшему метап`,
    required: true,
  })
  //   @Roles(RoleEnum.ADMIN)
  @UseGuards(/* RolesGuard || */ MeetupsGuard)
  @Delete('/:id')
  delete(@Param('id') id: number): Promise<Meetup> {
    return this.meetupService.delete(id);
  }
}
