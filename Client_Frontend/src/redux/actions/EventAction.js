import axios from 'axios';

// Action Types
export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

const API_URL = 'https://localhost:7013/api/Event';

// Create Event
export const createEvent = (eventData) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  try {
    const response = await axios.post(API_URL, eventData);
    dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data });
    
    alert('Event created successfully!');
    
    // Fetching the updated events
    dispatch(fetchEvents());
  } catch (error) {
    dispatch({ type: CREATE_EVENT_FAILURE, payload: error.message });
    alert('Failed to create event. Please try again.');
  }
};

// Fetch Events
export const fetchEvents = () => async (dispatch) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_EVENTS_FAILURE, payload: error.message });
  }
};

// Delete Event
export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT_REQUEST });
  try {
    await axios.delete(`${API_URL}/${eventId}`);
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });

    alert('Event deleted successfully!');
    
    // Fetch updated event list
    dispatch(fetchEvents());
  } catch (error) {
    dispatch({ type: DELETE_EVENT_FAILURE, payload: error.message });
    alert('Failed to delete event. Please try again.');
  }
};
