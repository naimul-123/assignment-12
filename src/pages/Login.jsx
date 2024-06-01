import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const [isShow, setIsShow] = useState(false)
    const navigate = useNavigate()
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
        }
    }
    const handleGoogleSingIn = () => {
        googleSignIn()
            .then((result) => {
                if (result.user) {

                    reset();
                    Swal.fire({

                        icon: "success",
                        title: "Log in with google Success!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-primary">Log in now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
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