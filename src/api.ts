import axios from "axios";

export const api = axios.create({ baseURL: "/api" });

export const ME_PATH = "/users/me";

let onUnauthorized: () => void = () => {};
export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url: string | undefined = error.config?.url;
    if (error.response?.status === 401 && url !== ME_PATH && url !== "/auth/login") {
      onUnauthorized();
    }
    return Promise.reject(error);
  },
);
