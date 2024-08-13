import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://18.215.187.55:3000/api"
});