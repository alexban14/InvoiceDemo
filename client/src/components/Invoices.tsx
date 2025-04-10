import React, { useState } from 'react';
import { useInvoices } from '../hooks/useInvoices';
import { useDeleteInvoice } from '../hooks/useInvoiceMutations';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Modal,
    Box,
    Typography,
    Button,
    // IconButton,
} from '@mui/material';
import axios from 'axios';
import CreateInvoice from './CreateInvoice';
import EditInvoice from "./InvoiceEdit.tsx";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Invoices = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, isLoading, isError } = useInvoices({ page, limit });
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const { mutate: deleteMutate } = useDeleteInvoice();

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            deleteMutate(id, {
                onSuccess: () => {
                    setOpenDetails(false);
                },
            });
        }
    };

    const fetchInvoiceDetails = async (id: string) => {
        const apiUrl = import.meta.env.VITE_SERVER_URL;
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${apiUrl}/invoices/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSelectedInvoice(response.data);
            setOpenDetails(true); // Open the modal
        } catch (error) {
            console.error('Error fetching invoice details:', error);
        }
    };

    const handleRowClick = (id: string) => {
        fetchInvoiceDetails(id);
    };

    const handleClose = () => {
        setOpenDetails(false);
        setSelectedInvoice(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching invoices</div>;
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <CreateInvoice open={openCreate} onClose={() => setOpenCreate(false)} />

            <TableContainer
                component={Paper}
                sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: '100vw',
                    }}
            >
                <Table sx={{ p: 5, margin: 5 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendor Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Paid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data.map((invoice) => (
                            <TableRow key={invoice.id}
                                      hover
                                      onClick={() => handleRowClick(invoice.id)}
                                      sx={{ cursor: 'pointer' }}
                            >
                                <TableCell>{invoice.vendor_name}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                                <TableCell>{invoice.description}</TableCell>
                                <TableCell>{invoice.paid ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                display="flex"
                justifyContent="flex-end"
                m={2}
                position="relative"
                zIndex={101}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenCreate(true)}
                >
                    Create Invoice
                </Button>
            </Box>

            <Pagination
                count={Math.ceil(data?.total / limit)} // Total number of pages
                page={page}
                onChange={handlePageChange}
                sx={{ mt: 2 }}
            />

            <Modal
                open={openDetails}
                onClose={handleClose}
                aria-labelledby="invoice-details-modal"
                aria-describedby="invoice-details-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Invoice Details
                    </Typography>
                    {selectedInvoice && (
                        <div>
                            <EditInvoice
                                open={openEdit}
                                onClose={() => setOpenEdit(false)}
                                invoice={selectedInvoice}
                            />

                            <Typography><strong>Vendor Name:</strong> {selectedInvoice.vendor_name}</Typography>
                            <Typography><strong>Amount:</strong> {selectedInvoice.amount}</Typography>
                            <Typography>
                                <strong>Due Date:</strong> {new Date(selectedInvoice.due_date).toLocaleDateString()}
                            </Typography>
                            <Typography><strong>Description:</strong> {selectedInvoice.description}</Typography>
                            <Typography><strong>Paid:</strong> {selectedInvoice.paid ? 'Yes' : 'No'}</Typography>

                            <Box mt={2} display="flex" justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={() => setOpenEdit(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDelete(selectedInvoice.id)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Invoices;
