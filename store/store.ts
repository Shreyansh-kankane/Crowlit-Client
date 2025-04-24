import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import widgetViewSlice from '../slice/widgetViewSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    widgetView: widgetViewSlice
  },
});
