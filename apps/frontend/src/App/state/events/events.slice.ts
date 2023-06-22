import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetEventsResponse } from 'App/api/endpoints/events/responses';

import { sendSuccessNotification } from '../utils/response';

import { EventsState, initialEventsState } from './events.state';

import { StatusType } from 'App/utils/interfaces/StatusTypes';

const eventsSlice = createSlice({
  name: 'events',
  initialState: initialEventsState,
  reducers: {
    getAllEventsStart: (state: EventsState) => {
      state.status.getAllEvents = StatusType.LOADING;
    },
    getAllEventsSuccess: (
      state: EventsState,
      action: PayloadAction<GetEventsResponse>,
    ) => {
      state.status.getAllEvents = StatusType.SUCCESS;
      state.events = action.payload;
    },
    getAllEventsFailure: (state: EventsState) => {
      state.status.getAllEvents = StatusType.FAILED;
    },

    createEventStart: (state: EventsState) => {
      state.status.createEvent = StatusType.LOADING;
    },
    createEventSuccess: (state: EventsState) => {
      state.status.createEvent = StatusType.SUCCESS;
      sendSuccessNotification('Successfully created event!');
    },
    createEventFailure: (state: EventsState) => {
      state.status.createEvent = StatusType.FAILED;
    },
  },
});

export default eventsSlice;

export const {
  createEventFailure,
  createEventStart,
  createEventSuccess,

  getAllEventsFailure,
  getAllEventsStart,
  getAllEventsSuccess,
} = eventsSlice.actions;
