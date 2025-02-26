import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user, 'isAdmin'],
        enabled: !!user && !loading,
        queryFn: async () => {

            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;


        }
    });

    return [isAdmin, isAdminLoading];
};



export default useAdmin;