import { Test } from '@nestjs/testing';
import { EventsService } from './events.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventsModule } from './events.module';
import { Event } from 'src/models/event.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsController } from './events.controller';
import { CreateEventDto } from './dto/create-event.dto';

const createMockedEvent = (id: number): Event => ({
	id,
	date: new Date('2022-03-30T10:00:00.000Z'),
	email: '123@email.com',
	firstname: 'Jan',
	lastname: 'Kowalski',
});

const createMockedCreateEventDto = (): CreateEventDto => ({
	date: new Date().toISOString(),
	email: '123@email.com',
	firstname: 'Jan',
	lastname: 'Kowalski',
});

describe('EventsController', () => {
	let app: INestApplication;
	let eventsService = {
		getAllEvents: async () => [createMockedEvent(0)],
		create: async (dto: CreateEventDto) => ({ ...dto, id: 1 }),
	};

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				EventsService,
				{
					provide: getRepositoryToken(Event),
					useValue: {
						find: jest
							.fn()
							.mockResolvedValue(() => [createMockedEvent(0)]),
						save: jest.fn().mockResolvedValue(createMockedEvent(0)),
					},
				},
			],
			controllers: [EventsController],
		})
			.overrideProvider(EventsService)
			.useValue(eventsService)
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it('/ (GET: get all events)', async () => {
		let result = await eventsService.getAllEvents();

		// Zastosuj transfomacje do wyjsciowego wyniku
		const mapEndResult = (event) => ({
			...event,
			date: event.date.toISOString(),
		});

		return request(app.getHttpServer())
			.get('/api/events')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200)
			.expect(result.map(mapEndResult));
	});

	it('/ (POST: create new event succesfully)', async () => {
		const createEventDto = createMockedCreateEventDto();

		return request(app.getHttpServer())
			.post('/api/events')
			.send(createEventDto)
			.expect(204);
	});
});
