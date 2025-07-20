import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const flowcashApi = axios.create({
    baseURL: API_URL
});

// Interceptor de request
flowcashApi.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem("MablaUser");
        token = JSON.parse(token);


        if (token) {
            config.headers.Authorization = `Bearer ${token.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de response
flowcashApi.interceptors.response.use(

    (response) => {
        return response;
    },
    (error) => {

        console.log("Error en la respuesta:", error.response.status);
        if (error.response.status === 401) {

            localStorage.removeItem("MablaUser");

            // Redirect to login page
            if (window.location.pathname !== "/login")
                window.location.href = "/login";
            }

        return Promise.reject(error);
    }

);
