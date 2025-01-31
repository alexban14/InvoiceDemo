import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Assuming Prisma is used

@Injectable()
export class InvoicesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(skip: number, take: number) {
        return this.prisma.invoice.findMany({
            skip,
            take,
        });
    }

    async count() {
        return this.prisma.invoice.count();
    }

    async findById(id: string) {
        return this.prisma.invoice.findUnique({ where: { id } });
    }
}
