import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true // Enable sending cookies with requests
});

// Request interceptor for API calls
api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post('/auth/refresh', { refreshToken });
        const { token } = response.data;
        localStorage.setItem('auth_token', token);
        return api(originalRequest);
      } catch (error) {
        // Handle refresh token error (e.g., logout user)
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 