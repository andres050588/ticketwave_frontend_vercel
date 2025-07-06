import { Card, Button, Badge } from "react-bootstrap"

export default function OrderCard({ order, onComplete, onCancel }) {
    const ticket = order.ticket

    return (
        <Card className="mb-4 shadow-sm">
            {ticket.imageURL && <Card.Img variant="top" src={ticket.imageURL} alt={ticket.title} style={{ maxHeight: "200px", objectFit: "cover" }} />}
            <Card.Body>
                <Card.Title>{ticket.title}</Card.Title>
                <Card.Text>Prezzo: €{ticket.price}</Card.Text>

                {ticket.eventDate && <Card.Text>Data evento: {new Date(ticket.eventDate).toLocaleString("it-IT")}</Card.Text>}

                <Card.Text>
                    Stato: <Badge bg={order.status === "acquistato" ? "success" : order.status === "impegnato" ? "warning" : "secondary"}>{order.status}</Badge>
                </Card.Text>

                {order.status === "impegnato" && (
                    <>
                        <Button variant="success" size="sm" className="me-2" onClick={() => onComplete(order.id)}>
                            Completa
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => onCancel(order.id)}>
                            Annulla
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    )
}
