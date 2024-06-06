import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const SidebarMenu = () => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
    const menuItem = <>
        {user && isAdmin && <>
            <li><NavLink to="adminHome">Home</NavLink></li>
            <li><NavLink to="manageAgreement">Manage Agreement</NavLink></li>
            <li><NavLink to="manageCupon">Manage Cupon</NavLink></li>
            <li><NavLink to="manageMember">Manage Member</NavLink></li>
        </>}

        <li><NavLink className="bg-green-300" to="mycart">My Cart</NavLink></li>
    </>

    return (
        <div className='bg-green-200 w-48 min-h-screen'>
            <ul className='menu'>
                {menuItem}
            </ul>
        </div>
    );
};

export default SidebarMenu;