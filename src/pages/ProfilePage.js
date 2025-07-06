import { useEffect, useState } from "react"
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuthRequest } from "../hooks/useAuthRequest.js"
import { useAuth } from "../utils/AuthContext.js"
import userAPI from "../api/userAPI.js"

export default function ProfilePage() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { authorizedRequest, errorMessage } = useAuthRequest()
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authorizedRequest("users/profile", "get", {}, userAPI)

                if (data) setProfile(data)
            } catch (error) {
                if (error.response?.status === 404) {
                    setError("Utente non trovato. Probabilmente non esiste nella Data Base")
                    localStorage.removeItem("token")
                    setTimeout(() => navigate("/register"), 3000)
                } else {
                    setError("Errore nel recupero del profilo")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [navigate])

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
    if (error) return <Alert variant="danger">{error}</Alert>

    return (
        <Container className="mt-5">
            {!profile ? (
                <Alert variant="warning">Profilo non disponibile</Alert>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {profile.name}
                            {profile.isAdmin && (
                                <Badge bg="danger" className="ms-2">
                                    Admin
                                </Badge>
                            )}
                        </Card.Title>
                        <Card.Text>Email: {profile.email}</Card.Text>
                        <Card.Text>
                            Registrato il:{" "}
                            {new Date(profile.createdAt).toLocaleString("it-IT", {
                                dateStyle: "long",
                                timeStyle: "short"
                            })}
                        </Card.Text>
                        {profile.isAdmin && (
                            <Button variant="outline-primary" className="mt-2 me-2" onClick={() => navigate("/admin/users")}>
                                Controlla lista utenti
                            </Button>
                        )}

                        <Button
                            variant="outline-danger"
                            className="mt-3"
                            onClick={() => {
                                logout()
                                navigate("/login")
                            }}
                        >
                            Logout
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}
