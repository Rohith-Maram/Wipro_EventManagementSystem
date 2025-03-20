import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [editData, setEditData] = useState({ name: '', date: '', description: '', location: '' });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7013/api/Event/${id}`);
        if (response.data && response.data.eventModel) {
          setEvent(response.data.eventModel);
          setEditData(response.data.eventModel);
          setAttendanceCount(response.data.attendanceCount);
        } else {
          throw new Error("Invalid event data");
        }
      } catch (err) {
        setError("Failed to fetch event details");
      }
    };

    fetchEventDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`https://localhost:7013/api/Event/${id}`, editData);
      setEvent(editData);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!event) return <div className="text-center mt-5">Event not found</div>;

  return (
    <div style={{ background: 'linear-gradient(90deg, #4568dc, #3498db, #00d2ff)', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container className="bg-white rounded shadow-sm p-4 mb-4" style={{ maxWidth: '800px' }}>
        <h1 className="text-center mb-3" style={{ color: '#e83e8c', fontFamily: 'cursive' }}>{event.name}</h1>
        <p className="mb-2"><strong>Date:</strong> {formatDate(event.date)}</p>
        <p className="mb-3"><strong>Description:</strong> {event.description}</p>
        <p className="mb-4"><strong>Location:</strong> {event.location}</p>
        <p className="mb-4"><strong>Confirmed Attendance:</strong> {attendanceCount}</p>

        <div className="text-center">
          <Button variant="warning" className="me-2" onClick={handleEditClick}>Edit Event</Button>
          <Button variant="primary" onClick={handleBackClick}>Back to Events</Button>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" name="name" value={editData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={formatDate(editData.date)} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={editData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={editData.location} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventDetails;