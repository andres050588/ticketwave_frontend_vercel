import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"

export default function AppNavbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <Navbar className="navbar" bg="dark" variant="dark" expand="lg">
            <Container className="navbar-container">
                <Navbar.Brand as={Link} to={"/"} className="navbar-logo">
                    <p>TicketWave</p>
                </Navbar.Brand>
                <Nav className="me-auto d-flex gap-4">
                    <Nav.Link as={Link} to={"/"}>
                        Home
                    </Nav.Link>

                    <NavDropdown title="Biglietti" id="navbar-biglietti-dropdown">
                        <NavDropdown.Item as={Link} to="/tickets" className="text-dark bg-light">
                            Biglietti Disponibili
                        </NavDropdown.Item>
                        {user && (
                            <>
                                <NavDropdown.Item as={Link} to="/orders/purchased" className="text-dark bg-light">
                                    Biglietti Acquistati
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/tickets/mytickets" className="text-dark bg-light">
                                    I miei biglietti in vendita
                                </NavDropdown.Item>
                            </>
                        )}
                    </NavDropdown>

                    {user && (
                        <>
                            <Nav.Link as={Link} to={"/sell"}>
                                Vendi
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/orders"}>
                                Ordini
                            </Nav.Link>
                        </>
                    )}
                </Nav>

                <div className="d-flex align-items-center navbar-links navbar-auth">
                    {user ? (
                        <>
                            <Nav.Link as={Link} to="/profile">
                                👤 Ciao, {user?.name || "ospite"}
                            </Nav.Link>
                            <Button className="logout-button ms-2" size="sm" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                        </>
                    )}
                </div>
            </Container>
        </Navbar>
    )
}
