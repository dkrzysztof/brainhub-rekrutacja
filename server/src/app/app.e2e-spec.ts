import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app/app.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TESTING_DATABASE } from '../../test/db';
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
					useValue: {},
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
			.expect('Content-Type', /text/)
			.expect('Hello Brainhub!');
	});
});
