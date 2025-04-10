import { z } from 'zod';

export const InvoiceFormSchema = z.object({
  vendor_name: z.string().min(1, 'Vendor name is required'),
  amount: z.string()
    .min(1, 'Amount is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount format'),
  due_date: z.union([z.string(), z.date()]),
  description: z.string().optional(),
  paid: z.boolean().default(false),
});

export type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;