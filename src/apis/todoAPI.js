import axios from "axios"
const BASE_URL = "https://todo.somee.com";
//const BASE_URL = "https://localhost:7297";

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});