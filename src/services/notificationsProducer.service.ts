import { Service } from 'typedi';
import { HttpException } from '@/exceptions/HttpException';
import { BaseNotification } from '@/interfaces/notifications.interfaces';
import { redisManager } from '@/utils/redisManager';

@Service()
export class NotificationProducerService {
  private readonly redisClient = redisManager.getClient();

  enqueueNotification = async (notification: BaseNotification): Promise<void> => {
    try {
     console.log('enqueueNotification', notification, JSON.stringify(notification))
      await this.redisClient.rpush(`${notification.channel}_notifications`, JSON.stringify(notification), (error, _) => {
        if (error) {
          throw new HttpException(500, 'Failed to enqueue notification' + error.message);
        }
      
      });
      console.log(`${notification.channel} notification enqueued`);
    } catch (error) {
      throw new HttpException(500, 'Failed to enqueue notification');
    }
  }
}
