import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { EventListenerService } from '../common/services/event-listener.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventListenerService: EventListenerService) {}

  @Post('webhook')
  @HttpCode(200) // SNS requires a 200 response
  async handleSNSEvent(@Body() body: any, @Headers() headers: any) {
    console.log('Received webhook call from SNS');

    try {
      // SNS sends different types of messages (subscription confirmation and notifications)
      if (headers['x-amz-sns-message-type'] === 'SubscriptionConfirmation') {
        // This is a subscription confirmation message
        console.log('Received subscription confirmation');

        // In a production system, you would confirm the subscription here
        // by calling the SubscribeURL that SNS provides
        console.log('Subscription URL:', body.SubscribeURL);

        // You could use the AWS SDK to confirm the subscription programmatically
        // or you can simply visit the URL in a browser to confirm manually

        return { success: true, message: 'Subscription confirmation received' };
      } else if (headers['x-amz-sns-message-type'] === 'Notification') {
        // This is an actual event notification
        await this.eventListenerService.handleEvent(body);
        return { success: true, message: 'Event processed successfully' };
      } else {
        console.log('Unknown SNS message type');
        return { success: false, message: 'Unknown SNS message type' };
      }
    } catch (error) {
      console.error('Error handling SNS event:', error);
      // Still return 200 to SNS to avoid retries if the error is due to our system
      return { success: false, message: error.message };
    }
  }
}