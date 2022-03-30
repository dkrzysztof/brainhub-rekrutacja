import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetEventsResponse } from 'App/api/endpoints/events/responses';
import { StatusType } from 'App/utils/interfaces/StatusTypes';
import { sendErrorNotification, sendSuccessNotification } from '../utils/response';
import { EventsState, initialEventsState } from './events.state';

const eventsSlice = createSlice({
	name: 'events',
	initialState: initialEventsState,
	reducers: {
		getAllEventsStart: (state: EventsState) => {
			state.status.getAllEvents = StatusType.LOADING;
		},
		getAllEventsSuccess: (state: EventsState, action: PayloadAction<GetEventsResponse>) => {
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
			sendErrorNotification('The server could not resolve request!');
		}
	}
});

export default eventsSlice;

export const {
	createEventFailure,
	createEventStart,
	createEventSuccess,

	getAllEventsFailure,
	getAllEventsStart,
	getAllEventsSuccess
} = eventsSlice.actions;
