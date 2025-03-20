import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const UserEventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [confirmationError, setConfirmationError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7013/api/Event/${id}`);
        setEvent(response.data.eventModel);
      } catch (err) {
        setError('Failed to fetch event details');
      }
    };

    fetchEventDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleBackClick = () => {
    navigate('/user/home');
  };

  const sendConfirmationEmail = (userEmail, eventDetails) => {
    emailjs.send(
      "service_9hz3111",   //  EmailJS Service ID
      "template_3no71rz",  // EmailJS Template ID
      {
        user_email: userEmail,
        event_name: eventDetails.name,
        event_date: formatDate(eventDetails.date),
        event_location: eventDetails.location,
      },
      "5gIg98skZD5sYs2-y"  // EmailJS Public Key
    )
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
      setConfirmationMessage("Attendance confirmed! A confirmation email has been sent.");
    })
    .catch((error) => {
      console.error("Failed to send email", error);
      setConfirmationError("Attendance confirmed, but email could not be sent.");
    });
  };

  const handleConfirmAttendance = async () => {
    try {
      const response = await axios.post(
        'https://localhost:7013/api/Attendance/confirm',
        { eventId: event.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
  
      console.log("API Response:", response.data);  // Debugging
  
      const userEmail = response.data.userEmail;
      if (!userEmail) {
        console.error("User email is missing from API response!");
        setConfirmationError("Attendance confirmed, but no email found.");
        return;
      }
  
      setConfirmationMessage("Attendance confirmed!");
      setConfirmationError(null);
  
      // Send confirmation email
      sendConfirmationEmail(userEmail, event);
    } catch (err) {
      console.error("Failed to confirm attendance", err);
      setConfirmationError("Failed to confirm attendance.");
      setConfirmationMessage(null);
    }
  };

  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!event) return <div className="text-center mt-5">Event not found</div>;

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #4568dc, #3498db, #00d2ff)',
        minHeight: '100vh',
        paddingTop: '2rem',
      }}
    >
      <Container
        className="bg-white rounded shadow-sm p-4 mb-4"
        style={{ maxWidth: '800px' }}
      >
        <h1
          className="text-center mb-3"
          style={{ color: '#e83e8c', fontFamily: 'cursive' }}
        >
          {event.name}
        </h1>

        <p className="mb-2">
          <strong>Date:</strong> {formatDate(event.date)}
        </p>
        <p className="mb-3">
          <strong>Description:</strong> {event.description}
        </p>
        <p className="mb-4">
          <strong>Location:</strong> {event.location}
        </p>

        <div className="text-center">
          <Button variant="success" className="me-2" onClick={handleConfirmAttendance}>
            Confirm Attendance
          </Button>
          <Button variant="primary" onClick={handleBackClick}>
            Back to Events
          </Button>
        </div>

        {confirmationMessage && (
          <Alert variant="success" className="mt-3">
            {confirmationMessage}
          </Alert>
        )}

        {confirmationError && (
          <Alert variant="danger" className="mt-3">
            {confirmationError}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default UserEventDetails;