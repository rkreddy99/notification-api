import { NotificationController } from '@/controllers/notification.controller';
import { EmailNotificationDto, PushNotificationDto, SmsNotificationDto } from '@/dtos/notifications.dto';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class NotificationRoute implements Routes {
  public path = '/notifications';
  public router = Router();
  public notification = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/push`, ValidationMiddleware(PushNotificationDto), this.notification.sendPushNotification);
    this.router.post(`${this.path}/email`, ValidationMiddleware(EmailNotificationDto), this.notification.sendEmailNotification);
    this.router.post(`${this.path}/sms`, ValidationMiddleware(SmsNotificationDto), this.notification.sendSmsNotification);
  }
}