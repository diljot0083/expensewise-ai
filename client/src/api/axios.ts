import axios from "axios";

let accessToken: string | null = null;

export const setAxiosToken = (token: string | null) => {
    accessToken = token;
};

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes("/auth/refreshToken")) {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const res = await api.post("/auth/refreshToken");
                setAxiosToken(res.data.accessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${res.data.accessToken}`;

                return api(originalRequest);
            } catch {
                setAxiosToken(null);
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;