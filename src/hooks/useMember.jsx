import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMember = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isMember, isPending: isMemberLoading } = useQuery({
        queryKey: [user, 'isMember'],
        enabled: !!user && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/member/${user?.email}`)
            return res.data
        }
    });

    return [isMember, isMemberLoading]

};

export default useMember;