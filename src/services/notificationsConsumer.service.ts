import { Service } from 'typedi';
import { redisManager } from '@/utils/redisManager';
import { PushNotification, EmailNotification, SmsNotification } from '@/interfaces/notifications.interfaces';
import { emailService } from './email.service';
import { messagingService } from './message.service';
import { pushNotificationsService } from './pushNotifications.service';

@Service()
export class NotificationConsumer {
  private readonly redisClient = redisManager.getClient();

  public async startPushNotificationConsumer(): Promise<void> {
    await this.startConsumer('push_notifications', this.handlePushNotification.bind(this));
  }

  public async startEmailNotificationConsumer(): Promise<void> {
    await this.startConsumer('email_notifications', this.handleEmailNotification.bind(this));
  }

  public async startSmsNotificationConsumer(): Promise<void> {
    await this.startConsumer('sms_notifications', this.handleSmsNotification.bind(this));
  }

  private async startConsumer(queueName: string, callback: (notification: any) => Promise<void>): Promise<void> {
    console.log(`Starting ${queueName} consumer...`);
    this.processQueue(queueName, callback);
  }

  private async processQueue(queueName: string, callback: (notification: any) => Promise<void>): Promise<void> {
    while (true) {
      console.log(`Waiting for notifications in queue: ${queueName}`);
      const [, notificationData] = await this.redisClient.brpop(queueName, 0);
      if (notificationData) {
        const notification = JSON.parse(notificationData);
        await callback(notification);
      }
    }
  }

  private async handlePushNotification(notification: PushNotification): Promise<void> {
    try {
      await pushNotificationsService.sendNotification(notification);
      console.log('Processing push notification:', notification);
    } catch (error) {
      console.error('Error processing push notification:', error);
    }
  }

  private async handleEmailNotification(notification: EmailNotification): Promise<void> {
    try {
      await emailService.sendEmail(notification);
      console.log('Processing email notification:', notification);
    } catch (error) {
      console.error('Error processing email notification:', error);
    }
  }

  private async handleSmsNotification(notification: SmsNotification): Promise<void> {
    try {
      console.log('Processing sms notification:', notification);
      await messagingService.sendSms(notification);
      console.log('Processing sms notification:', notification);
    } catch (error) {
      console.error('Error processing sms notification:', error);
    }
  }
}
