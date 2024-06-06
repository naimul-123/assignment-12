import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ManageMember = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: members = [], refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/members?email=${user?.email}`);
            return res.data;
        }
    })

    const removeMember = async (id) => {
        const res = await axiosSecure.patch(`/removeMember/${id}`)
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire("Member removed successfully!");
        }

    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members && members.map((member, idx) => <tr key={member._id}>
                            <th>{idx + 1}</th>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td><button className='btn btn-sm btn-secondary' onClick={() => removeMember(member._id)}>Remove</button></td>
                        </tr>)}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMember;