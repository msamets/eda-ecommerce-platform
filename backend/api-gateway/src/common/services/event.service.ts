import { Injectable, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SNSConfig } from '../aws/sns.config';
import { Event } from '../interfaces/event.interface';
import { TOPICS } from '../constants/topic.constants';

@Injectable()
export class EventService implements OnModuleInit {
  private snsConfig: SNSConfig;
  private topicArns: Map<string, string> = new Map();

  constructor() {
    this.snsConfig = SNSConfig.getInstance();
  }

  async onModuleInit() {
    // Initialize all topic ARNs at startup
    await this.initializeTopics();
  }

  private async initializeTopics(): Promise<void> {
    try {
      // Create all topics defined in TOPICS constant
      for (const [key, topicName] of Object.entries(TOPICS)) {
        const topicArn = await this.snsConfig.createTopicIfNotExists(topicName);
        this.topicArns.set(topicName, topicArn);
        console.log(`Topic initialized: ${topicName} -> ${topicArn}`);
      }
    } catch (error) {
      console.error('Error initializing topics:', error);
      throw error;
    }
  }

  /**
   * Create and publish an event to the specified topic
   */
  async publishEvent<T>(topicName: string, eventType: string, data: T): Promise<void> {
    try {
      // Get topic ARN
      const topicArn = this.topicArns.get(topicName);
      if (!topicArn) {
        throw new Error(`Topic ARN not found for topic: ${topicName}`);
      }

      // Create event
      const event: Event<T> = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        type: eventType,
        source: 'api-gateway',
        data,
      };

      // Publish to SNS
      await this.snsConfig.publish(topicArn, event);
    } catch (error) {
      console.error(`Error publishing event to topic ${topicName}:`, error);
      throw error;
    }
  }

  /**
   * Get the ARN for a topic
   */
  getTopicArn(topicName: string): string {
    const arn = this.topicArns.get(topicName);
    if (!arn) {
      throw new Error(`Topic ARN not found for topic: ${topicName}`);
    }
    return arn;
  }
}