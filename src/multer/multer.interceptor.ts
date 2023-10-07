import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MulterInterceptor implements NestInterceptor {
  constructor(private readonly upload: Multer.Instance) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return new Observable((observer) => {
      this.upload.array('images')(
        context.switchToHttp().getRequest(),
        context.switchToHttp().getResponse(),
        (err) => {
          if (err) {
            observer.error(err);
          } else {
            observer.next(true);
            observer.complete();
          }
        },
      );
    });
  }
}
