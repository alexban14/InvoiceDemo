import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard} from "../auth/jwt.guard";

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) {}

    // Get all invoices
    @Get()
    async getAllInvoices() {
        return this.invoicesService.getAllInvoices();
    }

    // Get a single invoice by ID
    @Get(':id')
    async getInvoiceById(@Param('id') id: string) {
        return this.invoicesService.getInvoiceById(id);
    }
}
