import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import useMember from '../../hooks/useMember';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin()
    const [isMember] = useMember()
    // console.log(isAdmin, isMember)
    const navLinks = <>
        <li><NavLink to="/" className={({ isActive }) =>
            isActive ? "bg-green-500 text-white" : "bg-green-100 text-green-500"
        }  >Home</NavLink></li>

        <li><NavLink className={({ isActive }) =>
            isActive ? "bg-green-500 text-white" : "bg-green-100 text-green-500"
        } to="/apartments">Apartments</NavLink></li>

        {!user && <li><NavLink className={({ isActive }) =>
            isActive ? "bg-green-500 text-white" : "bg-green-100 text-green-500"
        } to="/signUp">Sign Up</NavLink></li>}

    </>

    return (
        <div className="navbar  sticky top-0 z-[100] bg-green-100 bg-opacity-80 max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="w-48"><img src="/src/assets/logo.png" className='w-full' alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    {
                        user ? <>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu  menu-sm space-y-2 dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <span className='text-green-950 bg-green-200 font-bold'> {user?.displayName}</span>
                                </li>
                                {user && isAdmin && < li > <Link to="/dashboard/adminHome">Dashboard</Link></li>}
                                {user && isMember && < li > <Link to="/dashboard/memberHome">Dashboard</Link></li>}
                                {user && !isAdmin && !isMember && < li > <Link to="/dashboard/userHome">Dashboard</Link></li>}
                                <li><button className='btn btn-secondary btn-sm' onClick={() => logOut()}>Logout</button></li>
                            </ul>
                        </> : <>
                            <Link to="/login" className='btn btn-sm btn-secondary'>Log in</Link>

                        </>
                    }

                </div>
            </div>
        </div >

    );
};

export default Navbar;