import React, { useState } from "react";
import { Container, FormControl, InputGroup, Button } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";

const EventSearch = ({ events, setFilteredEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleSearch = () => {
    let filtered = events;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // if (searchDate.trim() !== "") {
    //   filtered = filtered.filter(event => {
    //     const eventDate = new Date(event.date).toISOString().split('T')[0]; // Extract YYYY-MM-DD
    //     return eventDate === searchDate;
    //   });
    // }

    setFilteredEvents(filtered);
  };

  return (
    <Container fluid className="py-3 bg-light" style={{ background: 'linear-gradient(90deg,  #2c3e50,#4568dc,#3498db'}} >
      <div className="d-flex justify-content-around align-items-center">
        <h2 className="mb-0">&nbsp;&nbsp;&nbsp;Events</h2>
        <div className="d-flex">
          <InputGroup className="me-2">
            <FormControl
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="me-2">
            <FormControl
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div className="d-flex align-items-center">
          <Bell size={20} className="me-2" />
          <span>Notifications</span>
        </div>
      </div>
    </Container>
  );
};

export default EventSearch;