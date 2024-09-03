import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://44.195.41.195:3000/api"
});