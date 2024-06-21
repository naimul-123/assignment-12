import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const CheckoutForm = ({ id }) => {
    const { user } = useAuth();
    const [isApply, setIsApply] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState('')
    const [billingMonth, setBillingMonth] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    // const [rent, setRent] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [cuponStatus, setCuponStatus] = useState('')

    const { data: agreement } = useQuery({
        queryKey: [user.email, id, 'agreement'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreement?id=${id}`)
            return res.data
        }
    })

    const rent = agreement?.rent || 0
    const discountAmount = parseFloat((rent * discount / 100).toFixed(2))
    const disCountedRent = rent - discountAmount;

    useEffect(() => {
        setIsApply(false)

        setCuponStatus('')
        if (disCountedRent > 0) {
            axiosSecure.post('/create-payment-intent', { rent: disCountedRent, billingMonth, id })
                .then(res => {
                    if (res.data.error) {
                        setError(res.data.error)
                    }
                    else {
                        setError('')
                        setClientSecret(res.data.clientSecret)
                    }

                })
        }


    }, [axiosSecure, disCountedRent, billingMonth, id])




    const handleSubmit = async (e) => {

        e.preventDefault();
        const billingMonth = e.target.month.value;

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {

            setError(error.message)
        }
        else {
            // console.log(paymentMethod)
            setError('')
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email || 'anonymous',

                }

            }
        })

        if (confirmError) {
            setError(confirmError.message)
        }
        else {

            if (paymentIntent.status === "succeeded") {
                const paymentInfo = {
                    id: agreement._id,
                    amount: paymentIntent.amount,
                    trxId: paymentIntent.id,
                    created: paymentIntent.created,
                    billingMonth
                }
                const res = await axiosSecure.post(`/updatePayment/`, paymentInfo)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: "Your payment has been succeeded",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();

                    setIsApply(false)
                    setError('')
                }


            }

        }

    }

    const handleCupon = async (e) => {
        e.preventDefault();
        const cupon_code = e.target.cupon_code.value;

        const res = await axiosSecure.get(`/cupon?code=${cupon_code}`)
        setCuponStatus(res.data.status)
        if (res.data.status === 'valid') {
            setDiscount(res.data.discount)

        }
        else {
            setDiscount(0)
        }

        e.target.reset();

    }

    const handlePayment = (e) => {
        const month = e.target.value
        setBillingMonth(month)
    }


    return (
        <div>
            <div className="card shrink-0 w-full max-w-sm shadow-lg">
                <div className="card-body">
                    <h3 className='text-2xl text-green-600 font-bold'>Total Rent: ${rent}</h3>
                    <p className="btn text-primary font-bold ">Have a cupon? <span className='btn btn-secondary btn-sm' onClick={() => setIsApply(!isApply)}>Apply Cupon</span></p>
                    {isApply && <form className='my-2' onSubmit={handleCupon}>

                        <div className="form-control flex-row gap-2 w-full" >
                            <input type="text" name='cupon_code' placeholder="Cupon Code" className="input input-bordered" required />
                            <button className="btn btn-primary" >Apply</button>
                        </div>
                        <div className="form-control">
                            {cuponStatus === "valid" ? (<div className='text-lg font-bold text-green-500'>
                                <p>Your cupon applied successcully.</p>
                                <p>Discount: ${discountAmount}</p>
                                <p>Rent after Discount: ${disCountedRent}</p>
                            </div>) : cuponStatus === "invalid" ? (<>
                                <p className='text-lg font-bold text-red-500'>invalid cupon code.</p>
                            </>) : null}

                        </div>
                    </form>}
                    <form className='my-2 space-y-6' onSubmit={handleSubmit}>
                        <select className="select select-bordered w-full max-w-xs" required onChange={handlePayment} name='month' defaultValue="">
                            <option value="" disabled>Select A month</option>
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                        </select>


                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        {error && <p className='text-red-500 font-semibold'>{error}</p>}

                        <div className="form-control my-6" >
                            <button disabled={!stripe || error || !clientSecret} className='btn btn-primary' type="submit">
                                Pay
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </div>

    );
};

export default CheckoutForm;