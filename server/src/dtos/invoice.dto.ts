import { z } from 'zod';

// Define validation schema using Zod for individual invoice
export const InvoiceSchema = z.object({
    id: z.string().uuid(),
    vendor_name: z.string().min(1),
    amount: z.number().min(0),
    due_date: z.date(),
    description: z.string().optional(),
    paid: z.boolean(),
    user_id: z.string().uuid(),
});

export const InvoiceListSchema = z.object({
    invoices: z.array(InvoiceSchema),
});

// DTO Type for individual invoice
export type InvoiceDto = z.infer<typeof InvoiceSchema>;

// DTO Type for invoice list
export type InvoiceListDto = z.infer<typeof InvoiceListSchema>;
