import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SidebarMenu from '../dashboard/SidebarMenu';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import useMember from '../hooks/useMember';

const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin()
    const [isMember] = useMember();
    console.log(isAdmin)
    console.log(isMember)
    const menuItem = <>
        {user && isAdmin && <>
            <li><NavLink to="/dashboard/adminHome">Admin Profile</NavLink></li>
            <li><NavLink to="/dashboard/manageAgreement">Manage Agreement</NavLink></li>
            <li><NavLink to="/dashboard/manageCupon">Manage Cupon</NavLink></li>
            <li><NavLink to="/dashboard/manageMember">Manage Member</NavLink></li>
        </>}
        {user && isMember && <>
            <li><NavLink to="/dashboard/memberHome">Member Profile</NavLink></li>
            <li><NavLink to="/dashboard/makePayment">Make Payment</NavLink></li>
            <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>

        </>}
        {user && !isAdmin && !isMember && <>
            <li><NavLink to="/dashboard/userHome">User Profile</NavLink></li>
            <li><NavLink to="/dashboard/announcement">Announcements</NavLink></li>

        </>}


        <li><NavLink className="bg-green-300" to="/">Home</NavLink></li>
    </>
    return (
        <div className='flex'>
            <div className='bg-green-200 w-48 min-h-screen'>
                <ul className='menu'>
                    {menuItem}
                </ul>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;