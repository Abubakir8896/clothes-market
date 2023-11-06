import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { Admin } from '../admin/models/admin.model';
import { Customer } from '../customer/models/customer.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendCustomerConfirmation(customer: Customer):Promise<void>{
        const url = `${process.env.API_HOST}/api/customers/activate/${customer.activation_link}`;
        await this.mailerService.sendMail({
        to:customer.email,
        subject: `Welcome to Online Magazine ?`,
        template: 'confirmation.hbs',
        context: {
        name: customer.first_name,
        url,
        }})}

        async sendAdminConfirmation(customer: Admin):Promise<void>{
            const url = `${process.env.API_HOST}/api/admins/activate/${customer.activation_link}`;
            await this.mailerService.sendMail({
            to:customer.email,
            subject: `Welcome to Clothes-Market ?`,
            template: 'confirmation.hbs',
            context: {
            name: customer.username,
            url,
            }})}
}