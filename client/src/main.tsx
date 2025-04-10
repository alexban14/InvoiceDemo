import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import './index.css';
import Navbar from './components/Navbar.tsx';
import Login from './components/Login.tsx';
import Invoices from './components/Invoices.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/invoices"
                            element={
                                <ProtectedRoute>
                                    <Invoices />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </QueryClientProvider>
    </Provider>
);
