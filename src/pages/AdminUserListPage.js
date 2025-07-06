import { useEffect, useState } from "react"
import { Table, Button, Spinner, Alert, Container } from "react-bootstrap"
import userAPI from "../api/userAPI.js"
import { useAuthRequest } from "../hooks/useAuthRequest"

export default function AdminUserListPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { authorizedRequest } = useAuthRequest()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await authorizedRequest("/admin/users", "get", {}, userAPI)
                setUsers(data)
            } catch (err) {
                setError("Errore nel caricamento utenti")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const handleDelete = async userId => {
        if (!window.confirm("Sei sicuro di voler cancellare questo utente?")) return

        try {
            await authorizedRequest(`/admin/users/${userId}`, "delete", {}, userAPI)
            setUsers(prev => prev.filter(user => user.id !== userId))
        } catch (err) {
            alert("Errore nella cancellazione")
        }
    }

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
    if (error) return <Alert variant="danger">{error}</Alert>

    return (
        <Container className="mt-4">
            <h2>Lista Utenti</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "✔️" : "❌"}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                                    Cancella
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
