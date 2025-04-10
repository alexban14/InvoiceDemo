import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InvoicesRepository } from './invoices.repository';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../dtos/invoice.dto';

@Injectable()
export class InvoicesService {
    constructor(private readonly invoicesRepository: InvoicesRepository) {}

    async getAllInvoices(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.invoicesRepository.findAll(skip, limit),
            this.invoicesRepository.count(),
        ]);

        return {
            total,
            page,
            limit,
            data,
        };
    }

    async getInvoiceById(id: string) {
        return this.invoicesRepository.findById(id);
    }

    async createInvoice(createInvoiceDto: CreateInvoiceDto, userId: string) {
        const data: Prisma.InvoiceUncheckedCreateInput = {
            vendor_name: createInvoiceDto.vendor_name,
            amount: new Prisma.Decimal(createInvoiceDto.amount), // Ensure Decimal for amount
            due_date: createInvoiceDto.due_date, // Now properly transformed to Date
            description: createInvoiceDto.description,
            paid: createInvoiceDto.paid,
            user_id: userId
        };

        return this.invoicesRepository.create(data);
    }

    async updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto) {
        const data: Prisma.InvoiceUncheckedUpdateInput = {};

        if (updateInvoiceDto.vendor_name !== undefined) {
            data.vendor_name = updateInvoiceDto.vendor_name;
        }
        if (updateInvoiceDto.amount !== undefined) {
            data.amount = new Prisma.Decimal(updateInvoiceDto.amount);
        }
        if (updateInvoiceDto.due_date !== undefined) {
            data.due_date = updateInvoiceDto.due_date;
        }
        if (updateInvoiceDto.description !== undefined) {
            data.description = updateInvoiceDto.description;
        }
        if (updateInvoiceDto.paid !== undefined) {
            data.paid = updateInvoiceDto.paid;
        }

        return this.invoicesRepository.update(id, data);
    }

    async deleteInvoice(id: string) {
        return this.invoicesRepository.delete(id);
    }
}
