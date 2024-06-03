import React from 'react';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    return (
        <div>

        </div>
    );
};

export default AdminRoute;