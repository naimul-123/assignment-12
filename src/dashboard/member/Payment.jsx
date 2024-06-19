import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PK)
const Payment = () => {
    return (
        <div className='max-w-md mx-auto my-16'>
            <Elements stripe={stripePromise} >
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;