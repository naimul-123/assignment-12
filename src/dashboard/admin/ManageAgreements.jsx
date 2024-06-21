import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import moment from 'moment';
import Swal from 'sweetalert2';

const ManageAgreements = () => {
    const axiosSecure = useAxiosSecure()
    const { data: agreements = [], refetch } = useQuery({
        queryKey: ['agreementData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreements`);
            return res.data
        }
    });

    const handleAcceptAgreement = (id, email) => {
        Swal.fire({
            title: "Do you want to accept agreement?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/acceptagreement?id=${id}&&email=${email}`)
                console.log(res.data)
                if (res.data.modifiedCount || res.data.matchedCount) {
                    Swal.fire({
                        title: "Confirmed!",
                        text: "Agreement accepted.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });

    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Info</th>
                        <th>Apartment Info</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {agreements.map((agreement, idx) => <tr key={agreement._id}>
                        <th>{idx + 1}</th>
                        <td>
                            <div>
                                <div className="font-bold">{agreement.name}</div>
                                <div className="text-sm opacity-50">{agreement.email}</div>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Floor No: {agreement.floor_no}</p>
                                <p>Block Name: {agreement.block_name}</p>
                                <p>Room No: {agreement.apartment_no}</p>
                                <p>Rent: ${agreement.rent}</p>
                                <p>Agreement Request Date: {moment(agreement.agreementAt).local().format('DD-MM-YYYY')}</p>
                            </div>
                        </td>
                        <td>
                            <div className='flex gap-2 flex-col lg:flex-row justify-center items-center'>
                                <button className='btn btn-primary btn-sm' onClick={() => handleAcceptAgreement(agreement._id, agreement.email)}>Accept</button>
                                <button className='btn btn-secondary btn-sm'>reject</button>
                            </div>
                        </td>

                    </tr>)}
                </tbody>
                {/* foot */}


            </table>
        </div>
    );
};

export default ManageAgreements;