import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'; // For form management
import { zodResolver } from '@hookform/resolvers/zod'; // For integrating Zod with React Hook Form
import { loginSchema, LoginFormData } from '../schemas/auth.schema'; // Import the schema and type
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            navigate('/invoices');
        }
    }, [token, navigate]);

    const apiUrl = import.meta.env.VITE_SERVER_URL;

    const handleLogin = async (data: LoginFormData) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email: data.email,
                password: data.password,
            });

            const { access_token } = response.data;

            dispatch(login(access_token));

            navigate('/invoices');
        } catch (err) {
            setError('Login failed. Please check your email and password.');
            console.error('Login error:', err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                minWidth: '100vw',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    width: 400,
                }}
            >
                <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Login
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
