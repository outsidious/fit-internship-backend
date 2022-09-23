import { forwardRef, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { HashingPassword } from 'src/shared/middlewares/hash-password.middleware';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashingPassword)
      .forRoutes({ path: 'auth/registration', method: RequestMethod.POST });
  }
}
