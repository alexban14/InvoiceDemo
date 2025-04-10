import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    Body,
    UseGuards,
    HttpStatus,
    HttpCode,
    Request,
    ForbiddenException,
    BadRequestException
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from "../auth/jwt.guard";
import {
    validateCreateInvoice,
    validateUpdateInvoice,
    CreateInvoiceDto,
    UpdateInvoiceDto
} from '../dtos/invoice.dto';

interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        username: string;
    };
}

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

    @Post('/create')
    async createInvoice(
        @Body() createInvoiceDto: CreateInvoiceDto,
        @Request() req: AuthenticatedRequest
    ) {
        try {
            return this.invoicesService.createInvoice(createInvoiceDto, req.user.userId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':id')
    async updateInvoice(
        @Param('id') id: string,
        @Body() updateInvoiceDto: UpdateInvoiceDto,
        @Request() req: AuthenticatedRequest
    ) {
        try {
            return this.invoicesService.updateInvoice(id, updateInvoiceDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteInvoice(
        @Param('id') id: string,
        @Request() req: AuthenticatedRequest
    ) {
        await this.invoicesService.deleteInvoice(id);
    }
}
