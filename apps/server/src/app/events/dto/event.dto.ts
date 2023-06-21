import { Transform } from 'class-transformer';

export class EventDto {
  firstname: string;

  lastname: string;

  email: string;

  @Transform(({ value }) => (value as Date).toISOString(), {
    toPlainOnly: true,
  })
  date: Date;
}
