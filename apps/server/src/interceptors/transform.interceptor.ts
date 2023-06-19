import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassType<T> {
  new (): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Partial<T>>,
  ): Observable<T> | Promise<Observable<T>> {
    return next
      .handle()
      .pipe(map((data) => plainToClass(this.classType, data)));
  }
}
