const Trip = require('../models/tripModel');
const asyncHandler = require('express-async-handler');

// get all trips
const getTrips = asyncHandler(async (req, res) => {
    const trips = await Trip.find({ user: req.user._id });
    console.log("Trips:", trips.data)
    res.json(trips);
});


// create a trip
const createTrip = asyncHandler(async (req, res) => {
    const { destination, startDate, endDate, budget, numberOfTravelers, notes } = req.body;

    console.log("Received the data");

    if (!destination || !startDate || !endDate || !budget || !numberOfTravelers) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    try {
        const trip = new Trip({
            destination,
            startDate,
            endDate,
            budget,
            numberOfTravelers,
            notes,
            user: req.user._id,
        });

        const createdTrip = await trip.save();
        res.status(200).json(createdTrip);
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500);
        throw new Error('Internal Server Error');
    }
});


// get a trip by id
const getTripById = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
        res.json(trip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// update a trip
const updateTrip = asyncHandler(async (req, res) => {
    const { destination, startDate, endDate, budget, numberOfTravelers, notes } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (trip.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to update this trip');
    } else {
        if (trip) {
            trip.destination = destination;
            trip.startDate = startDate;
            trip.endDate = endDate;
            trip.budget = budget;
            trip.numberOfTravelers = numberOfTravelers;
            trip.notes = notes;

            const updatedTrip = await trip.save();
            res.json(updatedTrip);
        } else {
            throw new Error('Trip not found');
        }
    }

});

// delete a trip
const deleteTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    console.log("Attempting to delete a trip");

    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    if (trip.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to delete this trip');
    }

    try {
        await trip.deleteOne();
        res.json({ message: 'Trip removed successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500);
        throw new Error('Internal Server Error');
    }
});


module.exports = { getTrips, createTrip, getTripById, updateTrip, deleteTrip }; // export the function

