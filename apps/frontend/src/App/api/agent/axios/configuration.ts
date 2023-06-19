import axios from 'axios';

import { errorHandler } from '../errorHandling/errorHandler';

export const baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, errorHandler);
