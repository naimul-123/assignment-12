import React from 'react';
import Banner from '../components/homeComponents/Banner';
import AboutBuilding from '../components/homeComponents/AboutBuilding';
import { Helmet } from 'react-helmet-async';
import ApartmentLocation from '../components/homeComponents/ApartmentLocation';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>UrbanNest || Home</title>
            </Helmet>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <ApartmentLocation></ApartmentLocation>
        </div>
    );
};

export default Home;