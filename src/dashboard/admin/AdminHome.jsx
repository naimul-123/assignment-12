import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const { data } = useQuery({
    //     queryKey: ['apartmentinfo'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/apartmentinfo/${user?.email}`);
    //         return res.data
    //     }

    // })

    return (
        <div>
            Admin Home
        </div>
    );
};

export default AdminHome;