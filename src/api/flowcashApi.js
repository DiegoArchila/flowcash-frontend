import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://3.235.230.46:3000/api"
});