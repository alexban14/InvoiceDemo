import { useInvoices } from '../hooks/useInvoices';
import { useState } from 'react';
import InvoiceModal from '../components/InvoiceModal';

const Invoices = () => {
    const { data, isLoading } = useInvoices();
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Invoices</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Status</th>
                </tr>
                </thead>
                <tbody>
                {data?.data.map((invoice) => (
                    <tr key={invoice.id} className="cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                        <td className="border p-2">{invoice.id}</td>
                        <td className="border p-2">${invoice.amount}</td>
                        <td className="border p-2">{invoice.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedInvoice && <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
        </div>
    );
};

export default Invoices;
