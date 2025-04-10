import axios from 'axios';
import { InvoiceFormValues } from "../schemas/invoice.schema.ts";

const apiUrl = import.meta.env.VITE_SERVER_URL;

interface FetchInvoicesParams {
    page?: number;
    limit?: number;
}

interface Invoice {
    id: string;
    vendor_name: string;
    amount: string;
    due_date: string;
    description: string;
    paid: boolean;
    user_id: string;
}

interface FetchInvoicesResponse {
    total: number;
    page: number;
    limit: number;
    data: Invoice[];
}

export const fetchInvoices = async ({
                                        page = 1,
                                        limit = 10,
                                    }: FetchInvoicesParams = {}): Promise<FetchInvoicesResponse> => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${apiUrl}/invoices`, {
        params: {
            page,
            limit,
        },
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
    });
    return response.data;
};

export const createInvoice = async (data: InvoiceFormValues) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${apiUrl}/invoices/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateInvoice = async (id: string, data: Partial<InvoiceFormValues>) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${apiUrl}/invoices/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteInvoice = async (id: string) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${apiUrl}/invoices/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};