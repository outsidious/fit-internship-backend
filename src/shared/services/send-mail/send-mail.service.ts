import { Injectable } from '@nestjs/common';
import { makeUrls } from '../../helpers/get-link-invitation.helper';
import { CalendarEventType } from 'src/shared/types/calendar-event.type';

import * as nodemailer from "nodemailer";
import { ConfigService } from '@nestjs/config';
import { CreateTransportType } from 'src/shared/types/create-transport.type';
import { Meetup } from 'src/modules/meetup/meetup.model';
import { CreatedMeetupDto } from 'src/modules/meetup/dto/create-meetup.dto';

@Injectable()
export class SendMailService {

  private createTransportConst: CreateTransportType;

  constructor(private configService: ConfigService){
    this.createTransportConst = {
      host: this.configService.get<string>('MAIL_HOST'),
      secure: this.configService.get<boolean>('MAIL_SECURE'),
      port: this.configService.get<number>('MAIL_PORT'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      }
    }
  }

  public async sendMail(to: string, meetup: Meetup | CreatedMeetupDto) {
    console.log(typeof meetup.duration);
    const dateStartMeetup = new Date(String(meetup.time));
    dateStartMeetup.setMinutes(dateStartMeetup.getMinutes() + meetup.duration);

    const event: CalendarEventType = {
      name: meetup.name,
      details: meetup.description,
      location: meetup.location,
      startsAt: String(meetup.time),
      endsAt: String(dateStartMeetup),
    }
    try {
      const transporter = nodemailer.createTransport(this.createTransportConst);

      await transporter.sendMail({
        from: this.createTransportConst.auth.user,
        to: to,
        subject: `Приглашение на событие: ${event.name}`,
        text: '',
        html: this.createBodyMail(event),
      })    
    } catch (error) {
      console.error(error);
    }
  }
  
  private createBodyMail(event: CalendarEventType): string{
    return `
    <p>Вы проявили интерес к собитию: ${event.name}</p>
    <p>Определилось время, когда это событие начнется</p>
    <a href=${makeUrls.google(event)}>Занести событие в колендарь</a>`
  }
}
