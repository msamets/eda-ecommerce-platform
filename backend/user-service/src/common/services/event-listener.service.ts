import { Injectable, OnModuleInit } from '@nestjs/common';
import { SNSConfig } from '../aws/sns.config';
import { TOPICS } from '../constants/topic.constants';
import { Event } from '../interfaces/event.interface';

@Injectable()
export class EventListenerService implements OnModuleInit {
  private snsConfig: SNSConfig;

  constructor() {
    this.snsConfig = SNSConfig.getInstance();
  }

  async onModuleInit() {
    // Initialize subscriptions to relevant topics
    await this.subscribeToTopics();
  }

  private async subscribeToTopics(): Promise<void> {
    try {
      // First, create or get the topics
      const userCreatedTopicArn = await this.snsConfig.createTopicIfNotExists(TOPICS.USER_CREATED);
      const userUpdatedTopicArn = await this.snsConfig.createTopicIfNotExists(TOPICS.USER_UPDATED);

      // Define the endpoint for HTTP/HTTPS subscription (this would be your actual API endpoint)
      const endpoint = process.env.SERVICE_ENDPOINT || 'http://localhost:3002/events/webhook';

      // Subscribe to the topics
      await this.snsConfig.subscribe(userCreatedTopicArn, 'http', endpoint);
      await this.snsConfig.subscribe(userUpdatedTopicArn, 'http', endpoint);

      console.log('Successfully subscribed to user topics');
    } catch (error) {
      console.error('Error subscribing to topics:', error);
      throw error;
    }
  }

  // Handle incoming events from SNS
  async handleEvent(rawEvent: any): Promise<void> {
    try {
      // SNS sends the message in a specific format, extract the actual event
      const message = JSON.parse(rawEvent.Message);
      const event = message as Event<any>;

      console.log(`Received event: ${event.type} from ${event.source}`);

      // Process the event based on its type
      switch (event.type) {
        case 'USER_CREATED':
          await this.handleUserCreated(event.data);
          break;
        case 'USER_UPDATED':
          await this.handleUserUpdated(event.data);
          break;
        default:
          console.log(`No handler defined for event type: ${event.type}`);
      }
    } catch (error) {
      console.error('Error handling event:', error);
      throw error;
    }
  }

  private async handleUserCreated(userData: any): Promise<void> {
    console.log('Processing USER_CREATED event:', userData);
    // Implement business logic for handling user creation
    // For example: update local database, trigger a notification, etc.
  }

  private async handleUserUpdated(userData: any): Promise<void> {
    console.log('Processing USER_UPDATED event:', userData);
    // Implement business logic for handling user updates
  }
}