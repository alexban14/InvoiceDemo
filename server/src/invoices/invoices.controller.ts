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
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        return this.invoicesService.getAllInvoices(pageNumber, limitNumber);
    }

    // Get a single invoice by ID
    @Get(':id')
    async getInvoiceById(@Param('id') id: string) {
        return this.invoicesService.getInvoiceById(id);
    }
}