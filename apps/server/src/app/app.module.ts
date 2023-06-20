import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configuration,
    }),
    DatabaseModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
