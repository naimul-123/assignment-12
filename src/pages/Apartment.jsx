import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Apartment = () => {
    const apartment = useLoaderData();
    const { user } = useAuth();
    // console.log(apartment)
    const { apartment_image, apartment_no, apartment_type, block_name, floor_no, rent, _id } = apartment;

    const axiosPublic = useAxiosPublic();
    const handleAgreement = async () => {
        const agreementData = {
            name: user.displayName,
            email: user.email,
            floor_no,
            block_name,
            apartment_no,
            rent,
            status: "pending"

        }
        const res = await axiosPublic.post('/agreement', agreementData);

        if (res.data.message) {
            Swal.fire({
                icon: "error",
                timer: 1500,
                text: res.data.message,
            });
        }
        if (res.data.acknowledged && res.data.insertedId) {
            Swal.fire({
                icon: "success",
                timer: 1500,
                text: "Agreement added successfully",
            });
        }

    }
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className='relative'><img src={apartment_image} alt={apartment_type} />
                <span className='absolute top-0 right-0 badge text-primary badge-lg font-bold'>Rent: ${rent}</span>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{apartment_type}</h2>
                <p>
                    Floor: {floor_no} Block: {block_name} Apartment No: {apartment_no}
                </p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={handleAgreement}>Agreement</button>
                </div>
            </div>
        </div>
    );
};

export default Apartment;