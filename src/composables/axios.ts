import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const config = {
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Response-Type': 'json',
    },
}
const instance = axios.create(config);


export async function axiosGet(url: string) {
    return instance.get(url);
}