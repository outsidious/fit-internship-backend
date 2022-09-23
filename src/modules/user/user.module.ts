import { forwardRef, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role, UserRole } from 'src/modules/role/role.model';
import { RoleModule } from 'src/modules/role/role.module';
import { Meetup, UserMeetup } from 'src/modules/meetup/meetup.model';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HashingPassword } from 'src/shared/middlewares/hash-password.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    forwardRef(() => AuthModule),
    RoleModule,
    SequelizeModule.forFeature([
      User,
      Role,
      UserRole,
      Meetup,
      UserMeetup
    ])
  ],
  exports: [
    UserService
  ]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashingPassword)
      .forRoutes(
        { path: 'user', method: RequestMethod.POST },
        { path: 'user/:id', method: RequestMethod.PUT }
      );
  }
}
