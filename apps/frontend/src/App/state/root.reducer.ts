import { combineReducers } from '@reduxjs/toolkit';

import eventsSlice from './events/events.slice';

const rootReducer = combineReducers({
  events: eventsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
