import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://44.204.170.18:3000/api"
});