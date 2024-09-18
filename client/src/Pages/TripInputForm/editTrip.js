import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTrip = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Your state variables
    const [isSubmited, setIsSubmited] = useState(false);
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [numberOfTravelers, setNumberOfTravelers] = useState('');
    const [notes, setNotes] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    // Assume you have a function to fetch trip details by ID from your API
    const fetchTripDetails = async () => {
        try {
            const response = await fetch(`https://tourez-backend.onrender.com/api/trips/${id}`);
            const tripData = await response.json();

            // Update state with the fetched data
            setDestination(tripData.destination);
            setStartDate(tripData.startDate);
            setEndDate(tripData.endDate);
            setBudget(tripData.budget);
            setNumberOfTravelers(tripData.numberOfTravelers);
            setNotes(tripData.notes);
            setUpdatedDate(tripData.updatedAt);

        } catch (error) {
            console.error('Error fetching trip details:', error);
        }
    };

    // Fetch trip details when the component mounts
    useEffect(() => {
        fetchTripDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo')).token;
            console.log("from handleUpdate: ", userInfo);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo}`,
                },
            };
            // send data to backend
            const response = await axios.put(`https://tourez-backend.onrender.com/api/trips/${id}`, {
                id,
                destination,
                startDate,
                endDate,
                budget,
                numberOfTravelers,
                notes
            },
                config
            );

            if (response.status === 200) {
                setIsSubmited(true);
                console.log("Trip has been updated!");
                navigate(`/dashboard`)
            } else {
                console.error('Error updating trip: ', response.statusText)
            }
        }
        catch (error) {
            console.log('Error updating trip: ', error)
        }
    };

    return (
        <div>
            <form className="trip-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Update Trip</h1>
                <div className="form-group">
                    <label htmlFor="destination">Destination:</label>
                    <input
                        type="text"
                        placeholder="Nepal.."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        value={startDate.substring(0, 10)}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        value={endDate.substring(0, 10)}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="budget">Budget:</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="numberOfTravelers">Number of Travelers:</label>
                    <input
                        type="number"
                        value={numberOfTravelers}
                        onChange={(e) => setNumberOfTravelers(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        name="notes"
                        id="notes"
                        cols="30"
                        rows="10"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}

                    ></textarea>
                    <div className="last-updated">
                        <p>Last updated: {updatedDate.substring(0, 10)}</p>
                    </div>
                </div>

                <div className="form-group buttons">
                    <button className="form-button update-button" type='submit'>Update</button>
                    <button className="form-button cancel-button" onClick={() => navigate(`/dashboard`)}>Cancel</button>
                    {isSubmited && <p>Trip has been updated!</p>}
                </div>
            </form>
        </div>
    );
};

export default EditTrip;
