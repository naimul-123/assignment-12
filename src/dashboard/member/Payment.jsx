import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_KEY)

const Payment = () => {
    const { id } = useParams();
    // const { agreement } = useQuery()

    return (
        <div className='max-w-md mx-auto my-16'>
            <Elements stripe={stripePromise} >
                <CheckoutForm id={id}></CheckoutForm>
            </Elements>
        </div>

    );
};

export default Payment;