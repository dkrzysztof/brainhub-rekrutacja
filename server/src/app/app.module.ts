import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from './events/events.module';

@Module({
	imports: [DatabaseModule, TypeOrmModule.forRoot(), EventsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
