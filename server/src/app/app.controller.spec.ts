import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TESTING_DATABASE } from 'test/db';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
	let appController: AppController;
	let app: TestingModule;

	beforeEach(async () => {
		app = await Test.createTestingModule({
			imports: [TypeOrmModule.forRoot(TESTING_DATABASE)],
			controllers: [AppController],
			providers: [AppService],
		}).compile();
		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello Brainhub!');
		});
	});

	afterEach(async () => {
		await app.close();
	});
});
