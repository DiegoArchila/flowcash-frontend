import axios from "axios";

export const flowcashApi= axios.create({
    baseURL: "http://3.89.81.131:3000/api"
});