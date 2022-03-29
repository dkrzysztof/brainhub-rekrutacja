import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Event } from 'src/models/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(Event)
		private readonly eventsRepository: Repository<Event>,
	) {}

	async getAllEvents(): Promise<Event[]> {
		const events = await this.eventsRepository.find();
		return events;
	}

	async create(createEventDto: CreateEventDto): Promise<Event> {
		const event = plainToInstance(Event, createEventDto);
		return await this.eventsRepository.save(event);
	}
}
