import * as AWS from 'aws-sdk';

export class SNSConfig {
  private static instance: SNSConfig;
  private sns: AWS.SNS;

  private constructor() {
    // Configure AWS SDK (credentials and region)
    AWS.config.update({
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.sns = new AWS.SNS();
  }

  public static getInstance(): SNSConfig {
    if (!SNSConfig.instance) {
      SNSConfig.instance = new SNSConfig();
    }
    return SNSConfig.instance;
  }

  public getSNS(): AWS.SNS {
    return this.sns;
  }

  // Function to publish a message to a topic
  public async publish(topicArn: string, message: any): Promise<void> {
    const params = {
      Message: JSON.stringify(message),
      TopicArn: topicArn,
    };

    try {
      await this.sns.publish(params).promise();
      console.log(`Message published to topic ${topicArn}`);
    } catch (error) {
      console.error('Error publishing message to SNS:', error);
      throw error;
    }
  }

  // Function to create a topic if it doesn't exist
  public async createTopicIfNotExists(topicName: string): Promise<string> {
    try {
      const { TopicArn } = await this.sns.createTopic({ Name: topicName }).promise();
      console.log(`Topic created or retrieved: ${TopicArn}`);
      return TopicArn;
    } catch (error) {
      console.error('Error creating topic:', error);
      throw error;
    }
  }

  // Function to subscribe to a topic
  public async subscribe(topicArn: string, protocol: string, endpoint: string): Promise<void> {
    const params = {
      Protocol: protocol, // 'http', 'https', 'email', 'sms', 'lambda', etc.
      TopicArn: topicArn,
      Endpoint: endpoint,
    };

    try {
      await this.sns.subscribe(params).promise();
      console.log(`Subscription created for endpoint ${endpoint} to topic ${topicArn}`);
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }
}