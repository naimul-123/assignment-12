import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/sharedComponents/Navbar';
import Footer from '../components/sharedComponents/Footer';

const CommonLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default CommonLayout;