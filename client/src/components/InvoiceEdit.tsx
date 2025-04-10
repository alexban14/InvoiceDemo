import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceFormValues, InvoiceFormSchema } from '../schemas/invoice.schema';
import { useUpdateInvoice } from '../hooks/useInvoiceMutations';
import { Button, TextField, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, parseISO } from 'date-fns';

interface EditInvoiceProps {
    open: boolean;
    onClose: () => void;
    invoice: InvoiceFormValues & { id: string };
}

const EditInvoice: React.FC<EditInvoiceProps> = ({ open, onClose, invoice }) => {
    const { mutate, isPending } = useUpdateInvoice();

    // Convert the due_date string to a Date object if it's a string
    const initialDueDate = typeof invoice.due_date === 'string'
        ? parseISO(invoice.due_date)
        : invoice.due_date;

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<InvoiceFormValues>({
        resolver: zodResolver(InvoiceFormSchema),
        defaultValues: {
            vendor_name: invoice.vendor_name,
            amount: invoice.amount,
            due_date: initialDueDate,
            description: invoice.description,
            paid: invoice.paid,
        },
    });

    const { field: dueDateField } = useController({
        name: 'due_date',
        control,
    });

    const onSubmit = (data: InvoiceFormValues) => {
        const formattedData = {
            ...data,
            due_date: data.due_date.toISOString(),
        };

        mutate({ id: invoice.id, data: formattedData }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Invoice</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Vendor Name"
                            {...register('vendor_name')}
                            error={!!errors.vendor_name}
                            helperText={errors.vendor_name?.message}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Amount"
                            type="number"
                            {...register('amount')}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                        />
                    </Box>
                    <Box mb={2}>
                        <DatePicker
                            label="Due Date"
                            value={dueDateField.value}
                            onChange={(newValue) => {
                                dueDateField.onChange(newValue);
                            }}
                            format="yyyy-MM-dd"
                            sx={{ width: '100%' }}
                            slotProps={{
                                textField: {
                                    error: !!errors.due_date,
                                    helperText: errors.due_date?.message,
                                },
                            }}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={3}
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Box>
                    <Box mb={2}>
                        <Typography component="label" display="flex" alignItems="center">
                            <input type="checkbox" {...register('paid')} />
                            <Typography ml={1}>Paid</Typography>
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary" disabled={isPending}>
                        {isPending ? 'Updating...' : 'Update Invoice'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditInvoice;
