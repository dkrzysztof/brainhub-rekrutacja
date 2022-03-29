import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app/app.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TESTING_DATABASE } from './db';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			providers: [
				AppService,
				{
					provide: getRepositoryToken(Event),
					useValue: {
						// find: jest
						// 	.fn()
						// 	.mockResolvedValue(() => [createMockedEvent(0)]),
						// save: jest.fn().mockResolvedValue(createMockedEvent(0)),
					},
				},
			],
			controllers: [AppController],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Hello Brainhub!');
	});
});
