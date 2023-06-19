import { requests } from 'App/api/agent/agent';
import { CreateEventRequest } from './requests/CreateEventRequest';
import { GetEventsResponse } from './responses';

const EventsApi = {
  getAllEvents: (): Promise<GetEventsResponse> => requests.get('/events'),

  createEvent: (body: CreateEventRequest) => requests.post('/events', body),
};

export default EventsApi;
