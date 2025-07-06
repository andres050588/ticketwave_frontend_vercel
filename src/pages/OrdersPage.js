import { useEffect, useState, useCallback } from "react"
import { Container, Card, Spinner, Alert, Row, Col, Badge, Button } from "react-bootstrap"
import OrderCard from "./OrderCard.js"

import { useAuthRequest } from "../hooks/useAuthRequest.js"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)

    const { authorizedRequest, errorMessage } = useAuthRequest()

    // Funzione riutilizzabile caricamento ordini
    const loadOrders = useCallback(async () => {
        setLoading(true)
        try {
            const data = await authorizedRequest(`/orders`)
            if (Array.isArray(data)) setOrders(data)
        } catch {
            console.error("Errore nel recupero degli ordini")
        } finally {
            setLoading(false)
        }
    }, [authorizedRequest])

    // Caricamento iniziale ordini
    useEffect(() => {
        loadOrders()
    }, [loadOrders])

    // auto-hide messaggio success
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 10000)
            return () => clearTimeout(timer)
        }
    }, [success])

    // complete order
    const handleComplete = async orderId => {
        try {
            const result = await authorizedRequest(`/orders/${orderId}/complete`, "post")

            if (result) {
                setSuccess("Ordine completato con successo")
                await loadOrders() // Caricamento ordini dopo aver completato ordine
            }
        } catch (error) {
            console.error(error.response?.data?.error || "Errore nel completamento ordine")
        }
    }

    // cancellazione order
    const handleCancel = async orderId => {
        try {
            const result = await authorizedRequest(`/orders/${orderId}`, "delete")
            if (result) {
                setSuccess("Ordine annullato")
                await loadOrders() // Caricamento ordini dopo aver annullato un ordine
            }
        } catch (error) {
            console.error(error.response?.data?.error || "Errore nell'annullamento ordine")
        }
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">I miei ordini</h2>
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {!loading && orders.length === 0 && <Alert variant="info">Nessun ordine trovato</Alert>}
            <Row>
                {orders.map(order => (
                    <Col md={4} key={order.id}>
                        <OrderCard order={order} onComplete={handleComplete} onCancel={handleCancel} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
