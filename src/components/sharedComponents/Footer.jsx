
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const Footer = () => {
    const { user } = useAuth();

    const navLinks = <>
        <li><Link to="/" className="link link-info">Home</Link></li>

        <li><Link className="link link-info" to="/apartments">Apartments</Link></li>

        {!user && <li><Link className="link link-info" to="/signUp">Sign Up</Link></li>}

    </>
    return (

        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <ul className="grid grid-flow-col gap-4">
                {navLinks}
            </ul>
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