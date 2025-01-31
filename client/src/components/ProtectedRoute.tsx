import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;