import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TrackOrder from './components/TrackOrder';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import './App.css';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <span className="company-name">Chakitha</span>
        </div>
        <div className="nav-right">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link to="/track-order">Track Order</Link></li>
            <li className="nav-item"><Link to="/about-us">About Us</Link></li>
            <li className="nav-item"><Link to="/contact">Contact</Link></li>
          </ul>
          <input type="text" placeholder="Search..." className="search-bar" />
          {isAuthenticated ? (
            <>
              <span className="profile-email">{user.email}</span>
              <button className="profile-button" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </button>
            </>
          ) : (
            <button className="profile-button" onClick={() => loginWithRedirect()}>
              Login
            </button>
          )}
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;