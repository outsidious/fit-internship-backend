import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, UserRole } from './role.model';
import { User } from 'src/modules/user/user.model';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([
      Role,
      User,
      UserRole
    ])
  ],
  exports: [
    RoleService
  ]
})
export class RoleModule {}
