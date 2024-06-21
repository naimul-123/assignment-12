import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SidebarMenu from '../dashboard/SidebarMenu';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import useMember from '../hooks/useMember';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin()
    const [isMember] = useMember();
    const [isShow, setIsShow] = useState(true)
    const menuItem = <>
        {user && isAdmin && <>
            <li><NavLink to="/dashboard/adminHome">Admin Profile</NavLink></li>
            <li><NavLink to="/dashboard/manageAgreement">Manage Agreement</NavLink></li>
            <li><NavLink to="/dashboard/manageCupons">Manage Cupon</NavLink></li>
            <li><NavLink to="/dashboard/manageMember">Manage Member</NavLink></li>
            <li><NavLink to="/dashboard/makeAnnouncement">Make Announcement</NavLink></li>
        </>}
        {user && isMember && <>
            <li><NavLink to="/dashboard/memberHome">Member Profile</NavLink></li>
            <li><NavLink to="/dashboard/makePayment">Make Payment</NavLink></li>
            <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>

        </>}


        {user && !isAdmin && !isMember && <>
            <li><NavLink to="/dashboard/userHome">User Profile</NavLink></li>

        </>}
        {user && !isAdmin && <>

            <li><NavLink to="/dashboard/announcement">Announcements</NavLink></li>

        </>}


        <li><NavLink className="bg-green-300" to="/">Home</NavLink></li>
    </>

    const handleToggleMenu = () => {
        setIsShow(!isShow)
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsShow(false)
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (

        <div className=''>
            <div className='md:hidden text-3xl p-2 top-0 fixed bg-green-200 w-full z-20' onClick={handleToggleMenu}>
                <FaBars />
            </div>

            <div className='relative my-10 md:my-0 flex'>
                <div className={!isShow ? "hidden md:block fixed bg-green-200 w-full max-w-screen-sm md:w-48 transition translate-x-1 ease-in-out delay-100   md:static z-10  border-r-2" : `bg-green-200 md:block w-48 fixed  md:static z-10  border-r-2`} >
                    <ul className='menu '>
                        {menuItem}
                    </ul>
                </div>
                <div className='flex-grow min-h-screen' onClick={() => setIsShow(false)} >
                    <Outlet></Outlet>
                </div>
            </div>

        </div>


    );
};

export default Dashboard;