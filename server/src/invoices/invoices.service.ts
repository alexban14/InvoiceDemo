import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllInvoices() {
        return this.prisma.invoice.findMany();
    }

    async getInvoiceById(id: string) {
        const invoice = await this.prisma.invoice.findUnique({ where: { id } });

        if (!invoice) {
            throw new NotFoundException(`Invoice with ID ${id} not found`);
        }
        return invoice;
    }
}
