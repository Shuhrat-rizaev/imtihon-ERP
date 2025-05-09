import axios, { AxiosResponse, AxiosError } from "axios";

export const ApiClient = axios.create({
  baseURL: "https://api.noventer.uz/api/v1/",
});
ApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

ApiClient.interceptors.response.use(
  <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "https://api.noventer.uz/api/v1/accounts/refresh/",
          {
            refresh: localStorage.getItem("refreshToken"),
          }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
