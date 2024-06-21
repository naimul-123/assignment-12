import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ManageCupons = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { data: cupons = [], refetch } = useQuery({
        queryKey: ["cupons"],
        queryFn: async () => {
            const res = await axiosSecure.get('/allcupons');
            return res.data;
        }
    })

    const handleCuponStatus = async (id) => {
        const res = await axiosSecure.patch(`/cupons/${id}`)
        if (res.data.modifiedCount) {
            refetch();
        }
    }
    const handleRemoveCupon = async (id) => {
        const res = await axiosSecure.delete(`/cupons/${id}`)
        if (res.data.deletedCount) {
            refetch();

            Swal.fire({
                title: "Removed",
                text: "Cupon removed successfully",
                icon: "success"
            });
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {


        const res = await axiosSecure.post('/addcupon', data);
        console.log(res.data)
        if (res.data.acknowledged) {
            refetch()
            reset()
            Swal.fire({
                title: "Success",
                text: "Cupon added successfully",
                icon: "success"
            });

        }


    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-pin-rows table-pin-cols">
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
                            <th>
                                <button className="btn bg-red-100 text-red-500 btn-sm border-red-500 hover:bg-red-200" onClick={() => handleRemoveCupon(cupon._id)}>Remove</button>
                            </th>
                        </tr>)}


                    </tbody>
                </table>
            </div>
            <label htmlFor="my_modal_7" className="btn">Add cupon</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div className="card shrink-0 w-full ">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Cupon Code</span>
                                </label>
                                <input type="text"  {...register("cupon_code", { required: "Cupon code must be required" })} placeholder="Cupon Code" className="input input-bordered" />
                                {errors.cupon_code && <p className='text-red-600'>{errors.cupon_code.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Discount Percentage</span>
                                </label>
                                <input type="text" {...register("discount", { required: "Cupon discount must be required" })} placeholder="Discount Percentage" className="input input-bordered" />
                                {errors.discount && <p className='text-red-600'>{errors.discount.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Cupon Description</span>
                                </label>
                                <textarea {...register("description", { required: "Cupon description must be required" })} className="textarea textarea-bordered h-24" placeholder="Cupon Description"></textarea>
                                {errors.description && <p className='text-red-600'>{errors.description.message}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>

        </div >
    );
};

export default ManageCupons;