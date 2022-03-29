import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TESTING_DATABASE: TypeOrmModuleOptions = {
	name: 'testing_database',
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_TEST_DATABASE,
	synchronize: true,
	logging: false,
	entities: ['src/**/models/*.entity.ts'],
	keepConnectionAlive: false,
};
