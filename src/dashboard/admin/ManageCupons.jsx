import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageCupons = () => {
    const axiosSecure = useAxiosSecure();
    const { data: cupons = [], refetch } = useQuery({
        queryKey: ["cupons"],
        queryFn: async () => {
            const res = await axiosSecure.get('/cupons');
            return res.data;
        }
    })

    const handleCuponStatus = async (id) => {
        const res = await axiosSecure.patch(`/cupons/${id}`)
        if (res.data.modifiedCount) {
            refetch();
        }
    }
    console.log(cupons)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{ }</th>
                            <th>Cupon Info</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cupons.map((cupon, idx) => <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>
                                <div className="flex flex-col gap-3 justify-center">
                                    <p className="font-bold">Cupon Code:{cupon.cupon_code}</p>
                                    <p className="font-bold">Discount Parcentage:{cupon.discount}</p>
                                    <p className="text-sm opacity-50">Cupon Description:{cupon.description}</p>
                                </div>
                            </td>
                            <td>

                                <span className={cupon.isActive ? "badge badge-lg  bg-green-100 text-green-500 font-bold " : "badge badge-lg bg-red-100 text-red-500 font-bold"}>{cupon.isActive ? "Active" : "Deactive"}</span>
                            </td>

                            <th>
                                <button className={cupon.isActive ? "btn bg-red-100 text-red-500 btn-sm border-red-500 hover:bg-red-200" : "btn bg-green-100 text-green-500 btn-sm border-green-500 hover:bg-green-200"} onClick={() => handleCuponStatus(cupon._id)}>{cupon.isActive ? "Deactivate" : "Activatate"}</button>
                            </th>
                        </tr>)}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCupons;