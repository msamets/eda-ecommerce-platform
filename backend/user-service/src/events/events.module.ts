import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventModule } from '../common/modules/event.module';

@Module({
  imports: [EventModule],
  controllers: [EventsController],
})
export class EventsModule {}