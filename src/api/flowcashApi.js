import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://34.201.23.29:3000/api"
});