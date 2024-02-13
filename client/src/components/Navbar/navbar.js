import React, { useState, useEffect, useCallback } from 'react';
import logo from '../../assets/logo.png';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../App';

const Navbar = () => {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = React.useContext(Context);

    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    const navigateToHome = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="nav-bar">
            <div className="logo-container">
                <img src={logo} alt="TourEZ Logo" onClick={navigateToHome} />
            </div>

            {loggedIn && <div className="my-trips" onClick={navigateToDashboard}>My Trips</div>}

            <div className="auth-buttons">
                {loggedIn ? (
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login"><button className="login-button">Login</button></Link>
                        <Link to="/register"><button className="signup-button">Signup</button></Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
