import {initializeApp, cert, App} from "firebase-admin/app";
import {messaging} from "firebase-admin"
import path from "path";

class PushNotificationsService {
    private static instance: PushNotificationsService;
  private app: App;
  constructor() {try {
    
      const serviceAccount = path.join(__dirname, "../config/serviceAccountKey.json");
      const app = initializeApp({
        credential: cert(serviceAccount),
      });
      this.app = app;
      console.log('Firebase app created successfully.');
  } catch (error) {
    console.error('Error creating Firebase app:', error);
    process.exit(1);
  }
  }

    public static getInstance(): PushNotificationsService {
        if (!PushNotificationsService.instance) {
        PushNotificationsService.instance = new PushNotificationsService();
        }
        return PushNotificationsService.instance;
    }

  async sendNotification({title, message, token}: {title: string, message: string, token: string}): Promise<void> {
    const payload = {
      notification: {
        title,
        body: message,
      },
      token,
    };
    await messaging(this.app).send(payload);
  }
}

export const pushNotificationsService = PushNotificationsService.getInstance();