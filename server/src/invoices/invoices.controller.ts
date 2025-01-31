import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard} from "../auth/jwt.guard";

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) {}

    // Get all invoices
    @Get()
    async getAllInvoices(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.invoicesService.getAllInvoices(page, limit);
    }

    // Get a single invoice by ID
    @Get(':id')
    async getInvoiceById(@Param('id') id: string) {
        return this.invoicesService.getInvoiceById(id);
    }
}