import { CreateEventRequest } from 'App/api/endpoints/events/requests/CreateEventRequest';

import { AppThunk } from '../store';

import {
  getAllEventsStart,
  getAllEventsSuccess,
  getAllEventsFailure,
  createEventFailure,
  createEventStart,
  createEventSuccess,
} from './events.slice';

import agent from 'App/api/agent/agent';

export const getAllEvents = (): AppThunk => (dispatch) => {
  dispatch(getAllEventsStart());
  agent.Events.getAllEvents()
    .then((res) => dispatch(getAllEventsSuccess(res)))
    .catch(() => dispatch(getAllEventsFailure()));
};

export const createEvent =
  (body: CreateEventRequest): AppThunk =>
  (dispatch) => {
    dispatch(createEventStart());
    agent.Events.createEvent(body)
      .then(() => dispatch(createEventSuccess()))
      .catch(() => dispatch(createEventFailure()));
  };
