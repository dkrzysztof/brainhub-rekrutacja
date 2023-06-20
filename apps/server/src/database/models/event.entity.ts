import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  firstname: string;

  @Column({
    nullable: false,
  })
  lastname: string;

  @Column({ nullable: false })
  email: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  @Transform(({ value }) => new Date(value as string), { toClassOnly: true })
  date: Date;
}
