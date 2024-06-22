import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const MakePayment = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: agreements, isLoading } = useQuery({
        queryKey: [user.email, 'agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myagreement/${user?.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return
    }
    return (
        <div>
            <div className="card shrink-0 w-full   bg-base-100">
                {agreements.length > 0 ? agreements.map(agreement => <form key={agreement._id} className=" max-w-screen-md justify-center items-center gap-2 m-2 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" defaultValue={agreement.email} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Floor No:</span>
                        </label>
                        <input type="text" placeholder="Floor No" defaultValue={agreement.floor_no} className="input input-bordered" disabled />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Block Name:</span>
                        </label>
                        <input type="text" placeholder="Block Name" defaultValue={agreement.block_name} className="input input-bordered" disabled />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Apartment no/room no:</span>
                        </label>
                        <input type="text" placeholder="apartment no/room no" defaultValue={agreement.apartment_no} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rent:</span>
                        </label>
                        <input type="text" placeholder="Rent" defaultValue={`$${agreement.rent}`} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control mt-6">
                        <Link to={`/dashboard/payment/${agreement._id}`} className="btn btn-primary">Submit/pay</Link>
                    </div>
                </form>)
                    :
                    <div className='card-body'>
                        <div role="alert" className="alert alert-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>You have no agreement to pay.</span>
                        </div>
                    </div>}
            </div>


        </div>
    );
};

export default MakePayment;