import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { getValueFromTokenHelper } from 'src/shared/helpers/get-value-from-token.helper';

@Injectable()
export class CacheUserInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const currentUserId = Number(getValueFromTokenHelper('id',req));
    await this.cacheManager.set('userId', currentUserId);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.cacheManager.del('userId')),
      );
  }
}