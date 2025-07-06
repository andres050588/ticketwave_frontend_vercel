import { useNavigate } from "react-router-dom"
import { useCallback, useState } from "react"
import userAPI from "../api/userAPI.js"
export const useAuthRequest = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    const authorizedRequest = useCallback(
        async (url, method = "get", config = {}, apiClient = userAPI) => {
            const token = localStorage.getItem("token")
            try {
                const response = await apiClient({
                    method,
                    url,
                    headers: {
                        ...(config.headers || {}),
                        ...(token && { Authorization: `Bearer ${token}` })
                    },
                    ...config
                })
                return response.data
            } catch (error) {
                const status = error.response?.status

                if (status === 401) {
                    if (window.location.pathname !== "/login") {
                        setErrorMessage("Sessione scaduta. Verrai reindirizzato al login.")
                        localStorage.removeItem("token")
                        setTimeout(() => navigate("/login"), 1500)
                    }
                } else if (status === 403) {
                    setErrorMessage(error.response?.data?.error || "Accesso negato.")
                } else if (status === 404) {
                    setErrorMessage("Risorsa non trovata.")
                } else {
                    setErrorMessage("Errore durante la richiesta.")
                }
                return null
            }
        },
        [navigate]
    )

    return { authorizedRequest, errorMessage }
}
