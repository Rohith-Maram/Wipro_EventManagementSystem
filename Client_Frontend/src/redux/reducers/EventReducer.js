import {
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAILURE,
    FETCH_EVENTS_REQUEST,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILURE
  } from '../actions/EventAction';
  
  const initialState = {
    events: [],
    loading: false,
    error: null
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EVENTS_REQUEST:
      case CREATE_EVENT_REQUEST:
      case DELETE_EVENT_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_EVENTS_SUCCESS:
        return { ...state, loading: false, events: action.payload };
      case CREATE_EVENT_SUCCESS:
        return { ...state, loading: false, events: [...state.events, action.payload] };
      case DELETE_EVENT_SUCCESS:
        return { ...state, loading: false, events: state.events.filter(event => event.id !== action.payload) };
      case FETCH_EVENTS_FAILURE:
      case CREATE_EVENT_FAILURE:
      case DELETE_EVENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default eventReducer;