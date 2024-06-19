import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const MakePayment = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { data: agreement, isLoading } = useQuery({
        queryKey: [user.email, 'agreement'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myagreement/${user?.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return
    }

    console.log(agreement)
    return (
        <div>
            <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                <form className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" defaultValue={agreement.email} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Floor No:</span>
                        </label>
                        <input type="text" placeholder="Floor No" defaultValue={agreement.floor_no} className="input input-bordered" disabled />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Block Name:</span>
                        </label>
                        <input type="text" placeholder="Block Name" defaultValue={agreement.block_name} className="input input-bordered" disabled />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Apartment no/room no:</span>
                        </label>
                        <input type="text" placeholder="apartment no/room no" defaultValue={agreement.apartment_no} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rent:</span>
                        </label>
                        <input type="text" placeholder="Rent" defaultValue={`$${agreement.rent}`} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control mt-6 col-span-full">
                        <Link to="/dashboard/payment" className="btn btn-primary">Submit/pay</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakePayment;