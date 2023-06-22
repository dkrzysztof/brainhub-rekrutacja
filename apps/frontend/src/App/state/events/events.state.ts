import { GetEventsResponse } from 'App/api/endpoints/events/responses';

import { StatusType } from 'App/utils/interfaces/StatusTypes';

export interface EventsState {
  status: {
    getAllEvents: StatusType;
    createEvent: StatusType;
  };
  events: GetEventsResponse;
}

export const initialEventsState: EventsState = {
  status: {
    getAllEvents: StatusType.INITIAL,
    createEvent: StatusType.INITIAL,
  },
  events: [],
};
