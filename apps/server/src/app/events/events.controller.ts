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
import { GetEventForGetEventsDto } from './dto/get-event-for-get-events.dto';
import { EventsService } from './events.service';

@Controller('/api/events')
export class EventsController {
	constructor(private eventsService: EventsService) {}

	@Get()
	@UseInterceptors(new TransformInterceptor(GetEventForGetEventsDto))
	async getAllEvents(): Promise<GetEventForGetEventsDto[]> {
		return await this.eventsService.getAllEvents();
	}

	@Post()
	@HttpCode(204)
	async create(@Body() createEventDto: CreateEventDto) {
		await this.eventsService.create(createEventDto);
		return;
	}
}
