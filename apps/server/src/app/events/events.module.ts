import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/database/models/event.entity';

import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  providers: [EventsService],
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
})
export class EventsModule {}
