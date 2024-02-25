import { EmailNotificationDto, PushNotificationDto, SmsNotificationDto } from '@/dtos/notifications.dto';
import { EmailNotification, PushNotification, SmsNotification } from '@/interfaces/notifications.interfaces';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Container } from 'typedi';
import { NotificationProducerService } from '@/services/notificationsProducer.service';

export class NotificationController {
    private notificationProducerService: NotificationProducerService = Container.get(NotificationProducerService);
    
    sendPushNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const notificationData: PushNotificationDto = req.body;
            const notification: PushNotification = {
                id: uuidv4(),
                ...notificationData,
                channel: 'push',
                timestamp: new Date().toISOString(),
            };
            await this.notificationProducerService.enqueueNotification(notification);
            res.status(200).json({ data: notification, message: 'push notification enqueued' });
        } catch (error) {
            next(error);
        }
    }

    sendEmailNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const notificationData: EmailNotificationDto = req.body;
            const notification: EmailNotification = {
                id: uuidv4(),
                ...notificationData,
                channel: 'email',
                timestamp: new Date().toISOString(),
            };
            await this.notificationProducerService.enqueueNotification(notification);
            res.status(200).json({ data: notification, message: 'email notification enqueued' });
        } catch (error) {
            next(error);
        }
    }

    sendSmsNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log('sendSmsNotification');
            const notificationData: SmsNotificationDto = req.body;
            const notification: SmsNotification = {
                id: uuidv4(),
                ...notificationData,
                channel: 'sms',
                timestamp: new Date().toISOString(),
            };
            await this.notificationProducerService.enqueueNotification(notification);
            res.status(200).json({ data: notification, message: 'sms notification enqueued' });
        } catch (error) {
            next(error);
        }
    }
}