// Import necessary components and libraries
import { React, useEffect, useState } from "react";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/esm/Accordion';
import axios from "axios";

// Dashboard component
const Dashboard = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();



    // delete operation
    const handleDelete = async (tripId) => {
        if (window.confirm("Are you sure")) {
            console.log(`Deleting trip with ID: ${tripId}`);
            const token = JSON.parse(localStorage.getItem('userInfo')).token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.delete(`/api/trips/${tripId}`, config);

                if (response.status === 200) {
                    console.log("Trip has been deleted!");
                    fetchTrips();
                } else {
                    console.error('Error deleting trip: ', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting trip: ', error.message);
            }
        }
    }

    // fetch trips
    const fetchTrips = async () => {
        if (!localStorage.getItem('userInfo')) {
            console.log("Not logged in yet, so can't fetch trips");
            return;
        }

        try {
            console.log("Logged in, fetching trips...");
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            console.log("User Info:", token);
            const response = await axios.get(`/api/trips`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Trips:", response.data);
            setTrips(response.data);
        } catch (error) {
            console.error("Error fetching trips", error);
        }
    };


    console.log(trips);

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Link to="/tripInputForm" className="create-new-trip"><button>Create New Trip</button></Link>

            <Accordion className="trip-list">
                {trips.map((trip) => (
                    <Accordion.Item key={trip._id} eventKey={trip._id}>
                        <Accordion.Header>
                            <div className="trip-preview">
                                <div className="trip-destination"><p>{trip.destination}</p></div>
                                <div className="trip-date"><p>{trip.startDate} to {trip.endDate}</p></div>
                                <div className="buttons">
                                    <Link to={`/editTrip/${trip._id}`}><button className="edit-button">Edit Trip</button></Link>

                                    <button className="delete-button" onClick={() => handleDelete(trip._id)}>Delete</button>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="notes">
                                <p>{trip.note}</p>
                                <p>{trip.budget}</p>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}

export default Dashboard;

