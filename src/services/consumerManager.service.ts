import { Service } from 'typedi';
import { NotificationConsumer } from './notificationsConsumer.service';

@Service()
export class ConsumerManager {
  constructor(private readonly notificationConsumer: NotificationConsumer) {}

  public async startAllConsumers(): Promise<void> {
    try {
        console.log('Starting push notification consumer...');
      await Promise.all([
        this.notificationConsumer.startPushNotificationConsumer(),
        this.notificationConsumer.startEmailNotificationConsumer(),
        this.notificationConsumer.startSmsNotificationConsumer(),
      ]);
      console.log('All notification consumers started successfully.');
    } catch (error) {
      console.error('Failed to start notification consumers:', error);
      throw error; // Propagate the error for handling at a higher level if needed
    }
  }
}
