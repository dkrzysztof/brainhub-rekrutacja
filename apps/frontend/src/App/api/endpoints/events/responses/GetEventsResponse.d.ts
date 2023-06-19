export interface GetEventsResponse {
  [index: number]: EventForGetEventsResponse;
}

export interface EventForGetEventsResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  date: string;
}
