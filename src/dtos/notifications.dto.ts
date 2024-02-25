import { IsEnum, IsNotEmpty, IsString } from "class-validator";

class BaseNotificationDto {
    @IsString()
    @IsNotEmpty()
    public message: string;
}

export class PushNotificationDto extends BaseNotificationDto {
    @IsEnum(['ios', 'android'])
    @IsNotEmpty()
    public platform: 'ios' | 'android';

    @IsString()
    @IsNotEmpty()
    public token: string;

    @IsString()
    @IsNotEmpty()
    public title: string;
}

export class EmailNotificationDto extends BaseNotificationDto {
    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public subject: string;
}

export class SmsNotificationDto extends BaseNotificationDto {
    @IsString()
    @IsNotEmpty()
    public phoneNumber: string;
}