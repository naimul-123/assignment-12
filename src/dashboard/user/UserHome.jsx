import React from 'react';
import useAuth from '../../hooks/useAuth';

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content flex-col shadow-lg ">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL} />
                    </div>
                </div>
                <div className="card">

                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{user?.displayName}</h2>
                        <p>{user?.email}</p>
                        <p>Agreement Accept Date: none</p>
                        <p>floor no: none</p>
                        <p>block: none</p>
                        <p>room no: none</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;