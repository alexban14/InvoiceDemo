import { z } from 'zod';

const parseDate = (val: unknown): Date => {
    if (val instanceof Date) return val;
    if (typeof val === 'string') {
        // If it's just a date (YYYY-MM-DD), add time to make it a valid datetime
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
            return new Date(`${val}T00:00:00`);
        }
        return new Date(val);
    }
    throw new Error('Invalid date format');
};

const InvoiceBaseSchema = z.object({
    vendor_name: z.string().min(1, 'Vendor name is required'),
    amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
    due_date: z.union([z.string(), z.date()])
        .transform((val: unknown) => parseDate(val)),
    description: z.string().optional(),
    paid: z.boolean().default(false),
});

export const CreateInvoiceSchema = InvoiceBaseSchema;

export const UpdateInvoiceSchema = InvoiceBaseSchema.partial();

export const InvoiceSchema = InvoiceBaseSchema.extend({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
});

export const InvoiceListSchema = z.object({
    invoices: z.array(InvoiceSchema),
});

// DTO Types
export type InvoiceDto = z.infer<typeof InvoiceSchema>;
export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoiceDto = z.infer<typeof UpdateInvoiceSchema>;
export type InvoiceListDto = z.infer<typeof InvoiceListSchema>;

// Validation functions for use in controllers
export const validateCreateInvoice = (data: unknown): CreateInvoiceDto => {
    return CreateInvoiceSchema.parse(data);
};

export const validateUpdateInvoice = (data: unknown): UpdateInvoiceDto => {
    return UpdateInvoiceSchema.parse(data);
};
