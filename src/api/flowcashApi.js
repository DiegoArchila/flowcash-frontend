import axios from "axios";
import { UserThunks } from "../store/slices/user/UserThunks";


export const flowcashApi= axios.create({
    baseURL: "https://api.mabla.app/api"
    //baseURL: "http://localhost:3001/api"
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

      //clear localStorage and remove user from store
      UserThunks.logoutUser();
      
      // Redirect to login page
      window.location.href = "/login";
      
    }

    return Promise.reject(error);
  }
);