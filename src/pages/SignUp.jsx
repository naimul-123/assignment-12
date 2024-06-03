import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const SignUp = () => {
    const { createUser, updateUserProfile, logOut } = useAuth();
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
        const imageFile = { image: data.image[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const photoUrl = res.data.data.display_url
            // console.log(photoUrl)
            const result = await createUser(data.email, data.password);
            if (result.user) {
                updateUserProfile(data.name, photoUrl)
                    .then(() => {
                        logOut()
                            .then(() => {
                                const userInfo = {
                                    name: data.name,
                                    email: data.email
                                }
                                axiosPublic.post('/users', userInfo)
                                    .then((res) => {
                                        if (res.data.insertedId) {
                                            reset();
                                            Swal.fire({

                                                icon: "success",
                                                title: "Your registration has been compleated!",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });

                                            navigate('/login')
                                        }
                                    })
                            })

                    })

            }

        }


    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>UrbanNest || Sign Up</title>
            </Helmet>
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl font-bold text-secondary">Sign Up here!</h2>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name:</span>
                            </label>
                            <input type="text" placeholder="Your Name" {...register("name", { required: "Name must be required" })} className="input input-bordered" />
                            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" {...register("email", { required: "Email must be required" })} className="input input-bordered" />
                            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <label className='input input-bordered flex items-center justify-between gap-2'>
                                <input type={isShow ? "text" : "password"} placeholder="password" {...register("password", {
                                    required: "Password must be required",
                                    validate: {
                                        upperCase: value => /[A-Z]/.test(value) || "Password must contains an uppercase letter.",
                                        lowerCase: value => /[a-z]/.test(value) || "Password must contains an lowercase letter.",
                                        number: value => /[0-9]/.test(value) || "Password must contains a number.",
                                        specialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contains a special charecter.",
                                        minLength: value => value.length >= 6 || "Password must be atleast 6 characters."

                                    }
                                })} />
                                <span className='w-4 h-4 opacity-70' onClick={() => setIsShow(!isShow)}> {isShow ? <FaEyeSlash /> : <FaEye />}</span>
                            </label>
                            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}


                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Picture:</span>
                            </label>
                            <input type="file" placeholder="You can't touch this" {...register("image", { required: "Image must be required" })} className="file-input file-input-bordered w-full max-w-xs" />
                            {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                        </div>
                        <div className="form-control mt-3 space-y-3">

                            <button className="btn btn-primary">Sign Up</button>
                            <p className='text-lg font-semibold'>Have an account? <Link to="/login" className='link-primary'>Log in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;