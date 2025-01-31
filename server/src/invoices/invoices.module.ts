import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {InvoicesRepository} from "./invoices.repository";

@Module({
  imports: [PrismaModule],
  providers: [InvoicesService, InvoicesRepository],
  controllers: [InvoicesController]
})
export class InvoicesModule {}
