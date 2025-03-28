import nodemailer from 'nodemailer';
import Singleton from './singleton';
import config from '../config';
import { otpEmailTemplate, newPasswordEmailTemplate } from './emailTemplates';
import crypto from "crypto";

class mailerService extends Singleton<mailerService> {
    private transporter: nodemailer.Transporter;

    constructor() {
        super();

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.nodeMailer.email,
                pass: config.nodeMailer.password,
            },
        });
    }

    public generateOtp(): string {
        return crypto.randomInt(100000, 999999).toString();
    }

    public generatePassword = (length = 12) => {
        return crypto.randomBytes(length).toString('base64').slice(0, length);
    };

    public async sendOtpEmail(email: string, otp: string): Promise<void> {
        const mailOptions = {
            from: config.nodeMailer.email,
            to: email,
            subject: 'Your OTP to Complete the Process',
            html: otpEmailTemplate(otp, "5"),
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send OTP email.');
        }
    }

    public async sendNewPasswordEmail(email: string, new_password: string): Promise<void> {
        const mailOptions = {
            from: config.nodeMailer.email,
            to: email,
            subject: 'Password Reset Complete: Here’s Your New Password',
            html: newPasswordEmailTemplate(new_password),
        };
        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send OTP email.');
        }
    }
}

export default mailerService.getInstance();
