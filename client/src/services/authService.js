import API from '@/services/apiClient';

export const login = creds => API.post('/auth/login', creds);
export const register = data => API.post('/auth/register', data);
export const getProfile = () => API.get('/user/me');
export const updateProfile = payload => API.put('/user/me', payload);