import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const { signIn, googleSignIn } = useAuth();
    const [isShow, setIsShow] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const result = await signIn(data.email, data.password);
        if (result.user) {

            reset();
            Swal.fire({

                icon: "success",
                title: "Log in Success!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true })
        }
    }
    const handleGoogleSingIn = () => {
        googleSignIn()
            .then((result) => {
                if (result.user) {

                    const userInfo = {
                        name: result.user.displayName,
                        email: result.user.email,

                    }
                    axiosPublic.post('/users', userInfo)
                        .then((res) => {

                            if (res.data.upsertedCount || res.data.modifiedCount || res.data.matchedCount) {

                                Swal.fire({
                                    icon: "success",
                                    title: "Log in with google Success!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate(from, { replace: true })

                            }
                        })
                }
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>UrbanNest || Login</title>
            </Helmet>
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl font-bold text-primary">Log in now!</h2>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control">
                            <label className="label">
                                <span onClick={handleGoogleSingIn} className="btn text-2xl btn-outline border-secondary btn-ghost text-gray-800 font-bold w-full" >Log in With <FcGoogle /></span>
                            </label>
                        </div>
                        <fieldset className='border border-secondary p-6  rounded-2xl'>
                            <legend className='text-primary font-bold  text-center'>Or Log in with email and password</legend>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" {...register("email", { required: "Email must be required" })} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className='input input-bordered flex items-center justify-between gap-2'>
                                    <input type={isShow ? "text" : "password"} placeholder="password" {...register("password", {
                                        required: "Password must be required",
                                    })} />
                                </label>
                            </div>

                            <div className="form-control mt-3 space-y-3">

                                <button className="btn  btn-outline text-2xl text-gray-700 font-bold">Log in</button>
                                <p className='text-lg font-semibold'>Don&apos;t Have an account? <Link to="/signup" className='link-primary'>Sign Up</Link></p>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;