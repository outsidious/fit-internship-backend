import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Http2SecureServer, Http2ServerRequest } from 'http2';
import { Table } from 'sequelize-typescript';
import { getValueFromTokenHelper } from 'src/shared/helpers/get-value-from-token.helper';
import { SendMailService } from 'src/shared/services/send-mail/send-mail.service';
import { CalendarEventType } from 'src/shared/types/calendar-event.type';
import { UserService } from 'src/modules/user/user.service';
import { CreatedMeetupDto } from './dto/create-meetup.dto';
import { SubscribeMeetupDto } from './dto/subscribe-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { Meetup } from './meetup.model';
import { Cache } from 'cache-manager';

@Injectable()
export class MeetupService {
    constructor(
        @InjectModel(Meetup) private meetupRepository: typeof Meetup,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private sendMailService: SendMailService,
        private userSerivice: UserService,
    ){}

    async create(dto: CreatedMeetupDto, req: Http2ServerRequest): Promise<Meetup>{
        try{
            const currentUser = await this.userSerivice.getUserByEmail(getValueFromTokenHelper('email', req));
            const newMeetup = await this.meetupRepository.create(dto);
            await newMeetup.$set('owner', [currentUser.id]);
            return newMeetup;
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getAll(): Promise<Meetup[]>{
        try{
            return await this.meetupRepository.findAll({include: ['users', 'owner']});
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number): Promise<Meetup>{
        try{
            const meetup = await this.meetupRepository.findByPk(id);
            await this.meetupRepository.destroy({where: {id}});
            return meetup;
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, dto: CreatedMeetupDto){
        try{
            let meetup = await this.meetupRepository.findByPk(id, {include: 'users'});
            if (meetup) {
                if (meetup.time.getDate() !== new Date(dto.time).getDate() || meetup.duration !== dto.duration) {
                    meetup.users.forEach(user => this.sendMailService.sendMail(user.email, dto))
                    meetup.time = dto.time;
                }
                await this.meetupRepository.update({...dto}, {where: {id}});
                meetup = await this.meetupRepository.findByPk(id, {include: 'users'});
                return meetup;              
            }
            throw new HttpException("Митап не найден", HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async addUser(dto: SubscribeMeetupDto): Promise<Meetup>{
        try{
            const user = await this.userSerivice.getUserById(dto.idUser);
            const meetup = await this.meetupRepository.findByPk(dto.idMeetup, {include: ['users', 'owner']});
            if (user && meetup) {
                await meetup.$add('users', [user.id]);
                if (meetup.time || meetup.duration) {
                    this.sendMailService.sendMail(user.email, meetup);
                }
                return await this.meetupRepository.findByPk(dto.idMeetup, {include: ['users', 'owner']});;
            }
            throw new HttpException("Пользователь или митап не найдены", HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async dellUser(dto: SubscribeMeetupDto): Promise<Meetup>{
        try{
            const user = await this.userSerivice.getUserById(dto.idUser);
            const meetup = await this.meetupRepository.findByPk(dto.idMeetup, {include: ['users', 'owner']});
            if (user && meetup) {
                await meetup.$remove('users', [user.id]);
                return await this.meetupRepository.findByPk(dto.idMeetup, {include: ['users', 'owner']});;
            }
            throw new HttpException("Пользователь или митап не найдены", HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST);
        }
    }
}