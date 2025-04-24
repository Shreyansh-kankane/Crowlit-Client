import { createSlice } from '@reduxjs/toolkit';

import { WIDGETSCREENS } from '../constants';

const initialState = {
    widgetState: WIDGETSCREENS.chatOpen
};

const widgetViewSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    setWidgetView(state,action){
        switch (action.payload.type) {
            case WIDGETSCREENS.chatOpen:
              state.widgetState = WIDGETSCREENS.chatOpen
              break;
            case WIDGETSCREENS.chatClose:
              state.widgetState = WIDGETSCREENS.chatClose
              break;
            case WIDGETSCREENS.minimizedLanding:
              state.widgetState = WIDGETSCREENS.minimizedLanding
              break;
            default:
              console.warn(`Unknown widget state type: ${action.payload.type}`);
          }
    }
    
},});

export const { 
    setWidgetView
} = widgetViewSlice.actions;
export default widgetViewSlice.reducer;
