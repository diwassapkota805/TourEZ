import { React, useState } from "react";
import "./tripInputForm.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import Alert from 'react-bootstrap/esm/Alert';


const TripInputForm = () => {

    // this is the schema for the form
    const schema = yup.object().shape({
        destination: yup.string().required(),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
        budget: yup.number().required(),
        numberOfTravelers: yup.number().required(),
    });

    // hook to handle form submission
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    })

    const [isSubmited, setIsSubmited] = useState(false);

    // testing form submission
    const onSubmit = async (data) => {
        try {


            const userInfo = localStorage.getItem('userInfo');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(userInfo).token}`,
                },
            }
            // send data to backend
            const response = await axios.post('/api/trips/create', {
                destination: data.destination,
                startDate: data.startDate,
                endDate: data.endDate,
                budget: data.budget,
                numberOfTravelers: data.numberOfTravelers,
                notes: data.notes
            },
                config
            );

            if (response.status === 200) {
                setIsSubmited(true);
                console.log("Trip has been created!");
                // handle any further actions after successful submission
            } else {
                console.error('Error creating trip: ', response.statusText)
            }
        } catch (error) {
            console.error('Error creating trip: ', error)
        }

        console.log(data);
        console.log("Form submitted");

        // after 3 seconds, set isSubmited to false
        setTimeout(() => {
            setIsSubmited(false);
        }, 3000);

        reset();
    }

    return (
        <div>
            <form className="trip-form" action="" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-title">Create a New Trip</h1>
                <div className="form-group">
                    <label htmlFor="destination">Destination:</label>
                    <input type="text" placeholder="Nepal.." {...register("destination")} />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" {...register("startDate")} />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" {...register("endDate")} />
                </div>

                <div className="form-group">
                    <label htmlFor="budget">Budget:</label>
                    <input type="number" placeholder="$1000" {...register("budget")} />
                </div>

                <div className="form-group">
                    <label htmlFor="number">Number of Travelers:</label>
                    <input type="number" placeholder="3" {...register("numberOfTravelers")} />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <textarea name="notes" id="notes" cols="30" rows="10" placeholder="Enter notes here..." {...register("notes")}></textarea>
                </div>

                <div className="form-group">
                    <button className="form-button" >Submit</button>
                    {isSubmited && <Alert variant="success" className="alert">Trip has been created!</Alert>}
                </div>


            </form>
        </div>
    )
}

export default TripInputForm;