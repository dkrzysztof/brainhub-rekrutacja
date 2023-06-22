import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Event } from 'src/database/models/event.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EventsService } from 'src/app/events/events.service';
import { EventsController } from 'src/app/events/events.controller';
import { CreateEventDto } from 'src/app/events/dto/create-event.dto';

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
  const eventsService: Record<keyof EventsService, Function> = {
    getAll: async () => [createMockedEvent(0)],
    create: async (dto: CreateEventDto) => ({ ...dto, id: 1 }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: EventsService, useValue: eventsService },
        {
          provide: getRepositoryToken(Event),
          useValue: {},
        },
      ],
      controllers: [EventsController],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  it('/events (GET: should get all events)', async () => {
    const result = await eventsService.getAll();

    // Zastosuj transfomacje do wyjsciowego wyniku
    const mapEndResult = (event) => ({
      ...event,
      date: event.date.toISOString(),
    });

    return request(app.getHttpServer())
      .get('/events')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(result.map(mapEndResult));
  });

  it('/events (POST: should create new event succesfully)', async () => {
    const createEventDto = createMockedCreateEventDto();

    return request(app.getHttpServer())
      .post('/events')
      .send(createEventDto)
      .expect(204);
  });

  it('/events (POST: should throw Bad Request on incorrect email)', async () => {
    const createEventDto = createMockedCreateEventDto();

    createEventDto.email = 'test';

    const response = await request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEventDto)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body.message[0]).toBe('email must be an email');
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.statusCode).toBe(400);
  });

  it('/events (POST: should throw Bad Request on empty body)', async () => {
    const response = await request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send({})
      .expect(400)
      .expect('Content-Type', /json/);

    const expectedResponse = [
      'firstname should not be empty',
      'firstname must be a string',
      'lastname should not be empty',
      'lastname must be a string',
      'email should not be empty',
      'email must be an email',
      'date should not be empty',
      'date must be a valid ISO 8601 date string',
      'date must include time after date as THH:MM:SSZ',
    ];

    expect(response.body.message.sort()).toStrictEqual(expectedResponse.sort());
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.statusCode).toBe(400);
  });

  it('/events (POST: should throw Bad Request on wrong data types)', async () => {
    const createEventDto = createMockedCreateEventDto() as any;

    createEventDto.firstname = 1;
    createEventDto.lastname = 2;
    createEventDto.date = '2022.03.30T12:00:00Z';

    const response = await request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEventDto)
      .expect(400)
      .expect('Content-Type', /json/);

    const expectedResponse = [
      'firstname must be a string',
      'lastname must be a string',
      'date must be a valid ISO 8601 date string',
    ];

    expect(response.body.message.sort()).toStrictEqual(expectedResponse.sort());
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.statusCode).toBe(400);
  });

  it('/events (POST: should throw Bad Request on wrong date format)', async () => {
    const createEventDto = createMockedCreateEventDto() as any;

    createEventDto.date = '30/03/2022T12:00:00Z';

    const response = await request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEventDto)
      .expect(400)
      .expect('Content-Type', /json/);

    const expectedResponse = ['date must be a valid ISO 8601 date string'];

    expect(response.body.message.sort()).toStrictEqual(expectedResponse.sort());
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.statusCode).toBe(400);
  });

  it('/events (POST: should throw Bad Request on empty time in date)', async () => {
    const createEventDto = createMockedCreateEventDto() as any;

    createEventDto.date = '2022-02-01';

    const response = await request(app.getHttpServer())
      .post('/events')
      .set('Accept', 'application/json')
      .send(createEventDto)
      .expect(400)
      .expect('Content-Type', /json/);

    const expectedResponse = [
      'date must include time after date as THH:MM:SSZ',
    ];

    expect(response.body.message.sort()).toStrictEqual(expectedResponse.sort());
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.statusCode).toBe(400);
  });
});
