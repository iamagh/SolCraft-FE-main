import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: 'http://localhost:4000'
  });

  instance.interceptors.request.use(
    (request: any) => {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const username = localStorage.getItem('username');
      // If a token exists, add it to the Authorization header
      if (token) {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${token}`,
          email,
          username
        };
      }

      return request;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { response } = error;

      if (response) {
        const errorMessage =
          response.data &&
          typeof response.data === 'object' &&
          'message' in response.data
            ? response.data.message
            : 'Internal server error';

        throw new Error(JSON.stringify(errorMessage, null, 2));
      } else {
        throw new Error(
          'Network error or server is unreachable'
        );
      }
    },
  );

  return instance;
}

const axiosInstance = createAxiosInstance();

export default axiosInstance;





