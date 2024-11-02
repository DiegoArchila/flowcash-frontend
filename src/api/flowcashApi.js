import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://52.3.17.204:3001/api"
});