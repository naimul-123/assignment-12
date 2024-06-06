import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className='flex flex-col justify-center items-center'>
            <span className='loading loading-spinner text-secondary'></span>
        </div>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} ></Navigate>
};

export default PrivateRoute;