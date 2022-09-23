import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getValueFromTokenHelper } from 'src/shared/helpers/get-value-from-token.helper';
import { Meetup } from './meetup.model';

@Injectable()
export class MeetupsGuard implements CanActivate {
  constructor(@InjectModel(Meetup) private meetupRepository: typeof Meetup) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const currentUserId = Number(getValueFromTokenHelper('id', req));
    const meetupCreatorId = (
      await this.meetupRepository.findByPk(req.params.id)
    ).createdBy;
    if (currentUserId === meetupCreatorId) {
      return true;
    }

    throw new UnauthorizedException({
      message: 'Пользователь не является автором митапа',
    });

    return false;
  }
}
