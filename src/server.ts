import { App } from '@/app';
import { NotificationRoute } from '@/routes/notifications.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ConsumerManager } from '@/services/consumerManager.service'; 
import { NotificationConsumer } from './services/notificationsConsumer.service';

// ValidateEnv();

async function startServer() {
  const app = new App([new NotificationRoute()]);
  app.listen();
}

async function startApp() {
    console.log('Starting app...');
    const notificationConsumer = new NotificationConsumer(); 
    console.log('Starting consumers...');
    const consumerManager = new ConsumerManager(notificationConsumer); 
    console.log('Starting all consumers...');
   consumerManager.startAllConsumers();
    console.log('Consumers started successfully.');
    startServer(); 
    console.log('Server started.');
}

startApp();
