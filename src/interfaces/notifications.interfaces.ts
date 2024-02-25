export interface PushNotification extends BaseNotification {
    channel: 'push';
    platform: 'ios' | 'android';
    token: string;
    title: string;
  }
  
  export interface EmailNotification extends BaseNotification {
    channel: 'email';
    email: string;
    subject: string;
  }
  
  export interface SmsNotification extends BaseNotification {
    channel: 'sms';
    phoneNumber: string;
  }

  export interface BaseNotification {
    id: string;
    message: string;
    timestamp: string;
    channel: 'push' | 'email' | 'sms';
  }
