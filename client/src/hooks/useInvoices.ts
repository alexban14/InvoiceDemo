import { useQuery } from '@tanstack/react-query';
import { fetchInvoices, FetchInvoicesParams } from '../api/invoice';

export const useInvoices = ({ page = 1, limit = 10 }: FetchInvoicesParams = {}) => {
    return useQuery({
        queryKey: ['invoices', page, limit],
        queryFn: () => fetchInvoices({ page, limit }),
    });
};
