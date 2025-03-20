import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/actions/EventAction';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserEventList = ({ events }) => { // Accept events prop
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events: allEvents, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleViewEvent = (id) => {
    navigate(`/user/event/${id}`);
  };

  // Format Date to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const eventsToRender = events || allEvents; // Use prop if available, otherwise Redux state

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Upcoming Events</h2>
      {loading && <p>Loading events...</p>}
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {eventsToRender.map((event) => (
          <Col md={4} key={event.id} className="mb-3">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text><strong>Date:</strong> {formatDate(event.date)}</Card.Text>
                <Card.Text><strong>Location:</strong> {event.location}</Card.Text>
                <Card.Text>{event.description}</Card.Text>
                <Button variant="primary" className="me-2" onClick={() => handleViewEvent(event.id)}>
                  View Event
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserEventList;