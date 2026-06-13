import axios from "axios";

const api = axios.create({
    baseURL : "https://enterprise-business-analytics-saas.onrender.com"
});

export default api;