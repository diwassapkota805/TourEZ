const express = require('express');
const { getTrips, createTrip, getTripById, updateTrip, deleteTrip } = require('../controllers/tripController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

module.exports = router; // export the router

router.route('/').get(protect, getTrips);
router.route('/create').post(protect, createTrip);
router.route('/:id').get(getTripById);
router.route('/:id').get(getTripById).put(protect, updateTrip);
router.route('/:id').get(getTripById).put(protect, updateTrip).delete(protect, deleteTrip);

