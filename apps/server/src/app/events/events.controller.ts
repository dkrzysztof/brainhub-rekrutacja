import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

import { CreateEventDto } from './dto/create-event.dto';
import { EventDto } from './dto/event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(EventDto))
  async getAllEvents(): Promise<EventDto[]> {
    return await this.eventsService.getAll();
  }

  @Post()
  @HttpCode(204)
  async create(@Body() createEventDto: CreateEventDto) {
    await this.eventsService.create(createEventDto);
    return;
  }
}
