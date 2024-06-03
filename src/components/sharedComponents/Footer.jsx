import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (

        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <aside>
                <Link to="/" className="w-48"><img src="/src/assets/logo.png" className='w-full' alt="" /></Link>
                <p>UrbanNest BMS. Providing reliable apartment service since 2012</p>

            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link to="https://x.com/"><FaTwitter /></Link>
                    <Link to="https://www.youtube.com/"><FaYoutube /></Link>
                    <Link to="https://facebook.com"><FaFacebook /></Link> </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by <Link to="/" className='link link-primary'>UrbanNest BMS</Link> </p>
            </aside>
        </footer>

    );
};

export default Footer;