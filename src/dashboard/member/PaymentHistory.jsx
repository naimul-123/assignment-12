import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';

const PaymentHistory = () => {

    const [month, setMonth] = useState('')
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: paymentinfo, isLoading } = useQuery({
        queryKey: [user?.email, month, 'paymentinfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymenthistory?email=${user?.email}&month=${month}`)
            return res.data;
        },
        keepPrevious: true,

    });



    const heighlightedText = (text, searchText) => {
        if (!searchText) {
            return text;
        }
        const regex = new RegExp(`(${searchText})`, 'gi')
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? <span key={index} className="text-orange-500">{part}</span> : part
        );
    }



    return (
        <div>
            <div className="form-control justify-center items-center max-w-sm mx-auto my-3">
                <label className="label">
                    <span className="label-text text-3xl text-green-500 text-center font-bold">Search by month name</span>
                </label>
                <div className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search by month name" onChange={(e) => setMonth(e.target.value)} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </div>
            </div>
            {paymentinfo ?
                <div className="overflow-x-auto max-w-screen-sm mx-auto">
                    <table className="table text-black table-zebra-zebra bg-emerald-100 table-pin-rows table-pin-cols">
                        <thead className='' >
                            <tr className='font-bold text-black '>
                                <th>#</th>
                                <th>TranxId</th>
                                <th>Billing Month</th>
                                <th>Paid Amount</th>
                                <th>Payment Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {paymentinfo?.map((payment, idx) =>
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{payment.trxId}</td>
                                    <td>{heighlightedText(payment.billingMonth, month)}</td>
                                    <td>${payment.paid_amount}</td>
                                    <td>{moment(payment.created_at).format('DD-MM-YYYY')}</td>

                                </tr>

                            )}


                        </tbody>

                    </table>

                </div>
                : <div role="alert" className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>You have no payment history.</span>
                </div>
            }
        </div>
    );
};

export default PaymentHistory;