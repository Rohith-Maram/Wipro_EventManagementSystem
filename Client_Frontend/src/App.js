import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import EventManagerNavbar from './Components/EventManagerNavbar';
import UserNavbar from './Components/UserNavbar';
import GuestNavbar from './Components/GuestNavbar';
import CreateEvent from './Components/CreateEvent';
import EventList from './Components/EventList';
import EventDetails from './Components/EventDetails';
import Register from './Components/Register';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import UserEventList from './Components/UserEventList';
import UserEventDetails from './Components/UserEventDetails';
import EventSearch from './Components/EventSearch';

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: '',
  });
  const [filteredEvents, setFilteredEvents] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setAuth({ isAuthenticated: true, role });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setAuth({ isAuthenticated: false, role: '' });
    }
  }, []);

  //Debugging
  console.log("Auth state in App.js:", auth);
  console.log("Token in LocalStorage:", localStorage.getItem("token"));
  console.log("Role in LocalStorage:", localStorage.getItem("role"));

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {!auth.isAuthenticated ? (
            <GuestNavbar />
          ) : auth.role === 'Admin' ? (
            <EventManagerNavbar auth={auth} setAuth={setAuth} />
          ) : (
            <UserNavbar setAuth={setAuth} />
          )}

          {auth.isAuthenticated && (auth.role === 'Admin' || auth.role === 'User') && (
            <EventSearch events={store.getState().events} setFilteredEvents={setFilteredEvents} />
          )}

          <Routes>
            <Route path="/" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />

            {/* Routes for Admin only */}
            {auth.isAuthenticated && auth.role === 'Admin' ? (
              <>
                <Route path="/home" element={<EventList events={filteredEvents} />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/event/:id" element={<EventDetails />} />
              </>
            ) : null}

            {/* Routes for User Only */}
            {auth.isAuthenticated && auth.role === 'User' ? (
              <>
                <Route path="/user/home" element={<UserEventList events={filteredEvents} />} />
                <Route path="/user/event/:id" element={<UserEventDetails />} />
              </>
            ) : null}

            {/* Any other routes will be redirected  */}
            <Route
              path="*"
              element={
                <Navigate to={auth.isAuthenticated ? (auth.role === 'Admin' ? "/home" : "/user/home") : "/login"} />
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;