import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meetup, UserMeetup } from './meetup.model';
import { UserModule } from 'src/modules/user/user.module';
import { User } from 'src/modules/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';
import { SendMailService } from 'src/shared/services/send-mail/send-mail.service';

@Module({
  providers: [MeetupService, SendMailService],
  controllers: [MeetupController],
  imports: [
    CacheModule.register(),
    UserModule,
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      Meetup,
      User,
      UserMeetup,
    ])
  ]
})
export class MeetupModule {}
