import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/user.model';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from 'src/modules/role/role.module';
import { Role, UserRole } from 'src/modules/role/role.model';
import { MeetupModule } from 'src/modules/meetup/meetup.module';
import { Meetup, UserMeetup } from 'src/modules/meetup/meetup.model';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadModels: true,
      models: [User, Role, Meetup, UserRole, UserMeetup],
    }),
    UserModule,
    RoleModule,
    MeetupModule,
    AuthModule,
  ]
})
export class AppModule {}
