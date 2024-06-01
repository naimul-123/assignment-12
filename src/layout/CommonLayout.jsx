import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../sharedComponents/Navbar';
import Footer from '../sharedComponents/Footer';

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