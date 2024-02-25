import twilio from 'twilio';

export class MessagingService {
    private static instance: MessagingService;
    private readonly twilioClient: twilio.Twilio;

    private constructor() {
        this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        console.log('Twilio client created successfully.');
    }

    public static getInstance(): MessagingService {
        if (!MessagingService.instance) {
            MessagingService.instance = new MessagingService();
        }
        return MessagingService.instance;
    }

    public async sendSms({phoneNumber, message}: {phoneNumber: string, message: string}): Promise<void> {
        await this.twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });
    }
}

export const messagingService = MessagingService.getInstance();