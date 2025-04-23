import { Controller, Post, Body } from '@nestjs/common';
import { EventService } from '../common/services/event.service';
import { TOPICS } from '../common/constants/topic.constants';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @Post('publish')
  async publishEvent(@Body() eventData: any) {
    // Extract event details from request body
    const { topic, type, data } = eventData;

    // Validate that the topic exists in our defined topics
    if (!Object.values(TOPICS).includes(topic)) {
      return {
        success: false,
        message: `Invalid topic: ${topic}. Available topics: ${Object.values(TOPICS).join(', ')}`,
      };
    }

    try {
      // Publish the event
      await this.eventService.publishEvent(topic, type, data);

      return {
        success: true,
        message: `Event published to topic ${topic}`,
        eventType: type,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to publish event: ${error.message}`,
      };
    }
  }
}