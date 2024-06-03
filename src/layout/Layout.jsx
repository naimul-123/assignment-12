import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/sharedComponents/Navbar';
import Footer from '../components/sharedComponents/Footer';

const Layout = () => {
    return (
        <div className='max-w-screen-xl  mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;