import axios from "axios"

const orderAPI = axios.create({
    baseURL: process.env.REACT_APP_ORDER_API,
    withCredentials: true
})

orderAPI.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    error => Promise.reject(error)
)

export default orderAPI
