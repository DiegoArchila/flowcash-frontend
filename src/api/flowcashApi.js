import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://localhost:3000/api"
});

// Interceptor de request
flowcashApi.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem("MablaUser");
      token = JSON.parse(token);

      //console.log("token", token);
  
      if (token) {
        config.headers.Authorization = `Bearer ${token.token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );