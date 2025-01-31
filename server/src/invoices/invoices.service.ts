import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from './invoices.repository';

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
}
