import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { MdApartment, MdBedroomParent } from 'react-icons/md';
import { CgUnavailable } from 'react-icons/cg';
import { FaUserCheck, FaUsers } from 'react-icons/fa';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: apartmentInfo, isLoading } = useQuery({
        queryKey: ['apartmentinfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/apartmentinfo`);
            return res.data
        }

    })
    if (isLoading) {
        return
    }
    const {
        totalapartments,
        totalBookedapratment,
        totalUser,
        totalMemberUser
    } = apartmentInfo;

    const bookedPercent = parseFloat((totalBookedapratment * 100 / totalapartments).toFixed(2));
    const availablePercent = 100 - bookedPercent;

    return (
        <div className=" flex max-w-screen-lg mx-auto ">

            <div className="hero-content flex-col ">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL} />
                    </div>
                </div>
                <div className="card">

                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{user?.displayName}</h2>
                        <p>{user?.email}</p>
                    </div>
                </div>

                <div className='m-6 max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3'>
                    <div className='flex  justify-center items-center text-center gap-3  p-6 bg-yellow-200  shadow-lg rounded-lg'>

                        <div>
                            <h2 className='text-2xl font-semibold'>Total Apartments</h2>
                            <h3 className="font-extrabold text-5xl">{totalapartments}</h3>
                        </div>
                        <div className='text-secondary text-5xl'>
                            <MdApartment />
                        </div>
                    </div>
                    <div className='flex  justify-center items-center text-center gap-3  p-6 bg-yellow-200  shadow-lg rounded-lg'>
                        <div>
                            <h2 className='text-2xl font-semibold'>Available rooms</h2>
                            <h3 className="font-extrabold text-5xl">{availablePercent}%</h3>
                        </div>
                        <div className='text-secondary text-5xl'>
                            <MdBedroomParent />
                        </div>
                    </div>
                    <div className='flex  justify-center items-center text-center gap-3  p-6 bg-yellow-200  shadow-lg rounded-lg'>
                        <div className='grow'>
                            <h2 className='text-2xl font-semibold '>Agreement/unavailable rooms</h2>
                            <h3 className="font-extrabold text-5xl">{bookedPercent}%</h3>
                        </div>
                        <div className='text-secondary text-5xl'>
                            <MdBedroomParent />
                        </div>
                    </div>
                    <div className='flex  justify-center items-center text-center gap-3  p-6 bg-yellow-200  shadow-lg rounded-lg'>
                        <div>
                            <h2 className='text-2xl font-semibold'>Users</h2>
                            <h3 className="font-extrabold text-5xl">{totalUser}</h3>
                        </div>
                        <div className='text-secondary text-5xl'>
                            <FaUsers />
                        </div>
                    </div>
                    <div className='flex  justify-center items-center text-center gap-3  p-6 bg-yellow-200  shadow-lg rounded-lg'>
                        <div>
                            <h2 className='text-2xl font-semibold'>Members</h2>
                            <h3 className="font-extrabold text-5xl">{totalMemberUser}</h3>
                        </div>
                        <div className='text-secondary text-5xl'>
                            <FaUserCheck />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;