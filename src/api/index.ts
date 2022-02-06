import Axios from "axios";

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_ENDPOINT,
    headers: {
        "content-type": "application/json",
    },
});

export default api;
