import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	});
	app.useGlobalPipes(
		new ValidationPipe({
			forbidUnknownValues: true,
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	);

	await app.listen(PORT);
	console.info(
		`\x1b[33m[SERVER]:\x1b[32m`,
		`Server is running on port`,
		`${PORT}`,
	);
}
bootstrap();
