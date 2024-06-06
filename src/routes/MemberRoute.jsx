import React from 'react';
import useAuth from '../hooks/useAuth';
import useMember from '../hooks/useMember';
import { Navigate, useLocation } from 'react-router-dom';

const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isMember, isMemberLoading] = useMember();
    const location = useLocation();
    if (loading || isMemberLoading) {
        return <span className='loading loading-spinner text-primary'></span>
    }

    if (user && isMember) {
        return children
    }
    return (
        <Navigate to="/login" state={{ from: location }} replace>

        </Navigate>
    );
};

export default MemberRoute;