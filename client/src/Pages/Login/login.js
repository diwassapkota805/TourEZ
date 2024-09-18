import React, { useState } from 'react'
import './login.css';
import axios from 'axios';
import Alert from 'react-bootstrap/esm/Alert';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App';

const Login = ({ history }) => {
    const [loggedIn, setLoggedIn] = React.useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(`Email: ${email} Password: ${password}`);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            // Send email and password to backend
            const { data } = await axios.post("https://tourez-backend.onrender.com/api/users/login", { email, password }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));

            // Set loggedIn to true and navigate to dashboard
            setLoggedIn(true);
            navigate('/dashboard');

        } catch (error) {
            setError(error.response.data.message);
        }
    }


    return (
        <div className="login">
            <form onSubmit={submitHandler} className="login-form" action="">
                <h1 className="form-title">Login</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="form-group">
                    <label htmlFor="email" className="label">Email</label>
                    <input value={email} type="text" placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Password</label>
                    <input value={password} type="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group buttons">
                    <button className="form-button" type="submit">Login</button>
                    <a href="/register" className='register-here'>Register Here</a>
                </div>
            </form>
        </div>
    )
}

export default Login
