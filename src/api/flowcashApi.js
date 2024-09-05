import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://54.236.58.229:3000/api"
});