import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = () => {
    const menuItem = <>
        <li><NavLink to="admin">Admin Home</NavLink></li>
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