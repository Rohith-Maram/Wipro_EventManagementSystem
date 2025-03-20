import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createEvent } from '../redux/actions/EventAction';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
  });
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const selectedDate = new Date(eventData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight

    if (selectedDate < today) {
      setErrorMessage('Event cannot be created for a past date.');
      return;
    }

    dispatch(createEvent(eventData));

    // Reset form after submission
    setEventData({
      name: '',
      date: '',
      location: '',
      description: '',
    });
    setValidated(false);
    setErrorMessage('');
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a2a6c, #4568dc, #00d2ff)',
        minHeight: '100vh',
        padding: '2rem 0',
      }}
    >
      <Container>
        <h2 className="text-white mb-4">Create Event</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Event Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={eventData.name}
                      onChange={handleChange}
                      placeholder="Enter event name"
                      required
                      maxLength={100}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Event name is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Event Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={eventData.date}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Event date is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Event Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={eventData.location}
                      onChange={handleChange}
                      placeholder="Enter event location"
                      maxLength={200}
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={eventData.description}
                      onChange={handleChange}
                      placeholder="Enter event description"
                      style={{ height: '100px' }}
                      maxLength={500}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      className="mt-3"
                      style={{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }}
                    >
                      Create Event
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateEvent;