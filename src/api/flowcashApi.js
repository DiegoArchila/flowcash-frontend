import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://localhost:3000/api"
});