import axios from "axios"

const ticketAPI = axios.create({
    baseURL: process.env.REACT_APP_TICKET_API,
    withCredentials: true
})

ticketAPI.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    error => Promise.reject(error)
)

export default ticketAPI
