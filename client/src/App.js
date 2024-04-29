import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './Pages/Home/home';
import Dashboard from './Pages/Dashboard/dashboard';
import TripInputForm from './Pages/TripInputForm/tripInputForm';
import EditTrip from './Pages/TripInputForm/editTrip';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';

// Create a context for managing user authentication state
export const Context = React.createContext();

function App() {
  // State for tracking user authentication status
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Render the application
  return (
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tripInputForm" element={<TripInputForm />} />
            <Route path="/editTrip/:id" element={<EditTrip />} />
            <Route path="*" element={<h1>Not Found...</h1>} />
          </Routes>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;

