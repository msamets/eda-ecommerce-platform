import { Module } from '@nestjs/common';
import { EventListenerService } from '../services/event-listener.service';

@Module({
  providers: [EventListenerService],
  exports: [EventListenerService],
})
export class EventModule {}