import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { getTokenFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    const token = getTokenFromLocalStorage();
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    // TODO: implement logout user
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;