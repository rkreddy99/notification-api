import sgMail, { MailDataRequired } from '@sendgrid/mail'

export class EmailService {
    private static instance: EmailService;
    private readonly sendGridApiKey: string;

    private constructor() {
        this.sendGridApiKey = process.env.SENDGRID_API_KEY;
        sgMail.setApiKey(this.sendGridApiKey);
        console.log('SendGrid client created successfully.');
    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    public async sendEmail({email, subject, message}: {email: string, subject: string, message: string
    }): Promise<void> {
        const msg: MailDataRequired = {
            to: email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject,
            html: message,
        };
        await sgMail.send(msg);
    }
}

export const emailService = EmailService.getInstance();
