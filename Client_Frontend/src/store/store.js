import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import eventReducer from '../redux/reducers/EventReducer';

const store = configureStore({
  reducer: eventReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;