const mongoose = require('mongoose');

const tripSchema = mongoose.Schema(
    {
        destination: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            requried: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        numberOfTravelers: {
            type: Number,
            required: true,
        },
        notes: {
            type: String,
            required: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;