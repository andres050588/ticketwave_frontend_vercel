import axios from "axios"

const axios_api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    withCredentials: true
})
// Interceptor sulle richieste per aggiungere il token
axios_api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default axios_api
