import React, { useState } from 'react';
import './register.css';
import Alert from 'react-bootstrap/esm/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setPasswordConfirm(e.target.value);
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setMessage('Passwords do not match');
        }
        else {
            setMessage(null);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post("/api/users", { name, email, password }, config);

                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/dashboard');

            } catch (error) {
                setError(error.response.data.message);
            }
        }

        console.log(`Name: ${name}, Email: ${email}, Password: ${password} PasswordConfirm: ${passwordConfirm}`);
    };

    return (
        <div className="register">
            <form className="register-form" onSubmit={handleSubmit}>
                {message && <Alert variant="danger">{message}</Alert>}
                <h1 className="form-title">Register</h1>
                <div className="form-group">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        type="text"
                        placeholder="Name.."
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        type="text"
                        placeholder="Email.."
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        placeholder="Password.."
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password.."
                        value={passwordConfirm}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="form-button">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
