import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/models/event.entity';

@Module({
  providers: [EventsService],
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
})
export class EventsModule {}
