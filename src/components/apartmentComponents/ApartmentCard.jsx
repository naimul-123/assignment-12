import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const ApartmentCard = ({ apartment }) => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const { apartment_image, apartment_no, apartment_type, block_name, floor_no, rent, _id } = apartment;
    const handleAgreement = (id) => {
        if (!user) {
            navigate('/login')
        }
        console.log(id)
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
                    <Link to={`/apartment/${_id}`} className="btn btn-primary">Agreement</Link>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;