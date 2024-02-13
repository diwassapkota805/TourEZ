import React from "react";

const TripList = ({ TripList }) => {
    return (
        <div className="trip-list">
            {TripList.map((trip) => (
                <div className="trip-preview" key={trip.id}>
                    <h2>{trip.title}</h2>
                    <p>Created by {trip.author}</p>
                </div>
            ))}
        </div>
    )
};
export default TripList;