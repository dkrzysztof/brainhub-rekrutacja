import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from 'src/database/models/event.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

const createMockedEvent = (id: number): Event => ({
  id,
  date: new Date(),
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

describe('EventsService', () => {
  let service: EventsService;
  let module: TestingModule;
  let eventsRepository: Repository<Event>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: getRepositoryToken(Event), useClass: Repository },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    eventsRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(eventsRepository).toBeDefined();
  });

  it('should create new event', async () => {
    const createEventDto = createMockedCreateEventDto();
    const event = plainToInstance(Event, createEventDto);

    const repositorySpy = jest
      .spyOn(eventsRepository, 'save')
      .mockResolvedValueOnce(event);

    expect(await service.create(createEventDto)).toBe(event);
    expect(repositorySpy).toBeCalledTimes(1);
  });

  it('should return events array', async () => {
    const result: Event[] = [createMockedEvent(1), createMockedEvent(2)];
    const eventRepositorySpy = jest
      .spyOn(eventsRepository, 'find')
      .mockResolvedValue(result);

    expect(await service.getAll()).toBe(result);
    expect(eventRepositorySpy).toBeCalledTimes(1);
  });
});
