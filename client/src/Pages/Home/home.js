import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    // useState(() => {
    //     const userInfo = localStorage.getItem('userInfo');
    //     if (userInfo) {
    //         history.push("/dashboard");
    //     }
    // }, [history]);

    const handleGetStarted = () => {
        console.log("Get started button clicked");
        navigate('/tripInputForm');
    }
    return (
        <div className="home">
            <div className="home-left">
                <h1 className="home-title">TourEZ</h1>
                <h2 className="home-subtitle">Your Next Journey, Optimized</h2>
                <p className="home-description">Embark on seamless travel experience with TourEZ, your go-to web application for effortless trip plannign. Craft personalized itineaires, explore exciting destinations, and make every journey memorable. Start your adventure with TourEZ today!</p>
                <button className="form-button" onClick={handleGetStarted}>Get Started</button>
            </div>
            <div className="home-right">
                <div className="hero-image"></div>
            </div>
        </div>
    );
};

export default Home;