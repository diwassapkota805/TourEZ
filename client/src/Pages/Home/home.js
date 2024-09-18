import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        console.log("Get started button clicked");
        navigate('/register');
    }
    return (
        <div className="home">
            <div className="home-top">
                <div className="home-left">
                    <h1 className="home-title">TourEZ</h1>
                    <h3 className="home-subtitle">Your Next Journey, Optimized</h3>
                    <p className="home-description">Embark on seamless travel experience with TourEZ, your go-to web application for effortless trip plannign. Craft personalized itineaires, explore exciting destinations, and make every journey memorable. Start your adventure with TourEZ today!</p>
                    <button className="form-button" onClick={handleGetStarted}>Get Started</button>
                </div>
                <div className="home-right">
                    <div className="hero-image"></div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="footer">
                <p className="footer-text">© 2023 TourEZ. All rights reserved.</p>
            </div>

        </div>
    );
};

export default Home;