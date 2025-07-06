import axios from "axios"

const userAPI = axios.create({
    baseURL: process.env.REACT_APP_USER_API,
    withCredentials: true
})

userAPI.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) config.headers.Authorization = `Bearer ${token}`
        config.headers["Cache-Control"] = "no-cache"
        return config
    },
    error => Promise.reject(error)
)

export default userAPI
