import React from 'react';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceFormValues, InvoiceFormSchema } from '../schemas/invoice.schema';
import { useCreateInvoice } from '../hooks/useInvoiceMutations';
import { Button, TextField, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface CreateInvoiceProps {
  open: boolean;
  onClose: () => void;
}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({ open, onClose }) => {
  const { mutate, isPending } = useCreateInvoice();
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues: {
      paid: false,
    },
  });

  const { field: dueDateField } = useController({
    name: 'due_date',
    control,
  });

  const onSubmit = (data: InvoiceFormValues) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Invoice</DialogTitle>
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
                onChange={(newValue) => dueDateField.onChange(newValue)}
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
            {isPending ? 'Creating...' : 'Create Invoice'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateInvoice;