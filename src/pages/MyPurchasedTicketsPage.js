import React from "react"
import TicketList from "../components/TicketList"

export default function MyPurchasedTicketsPage() {
    return <TicketList title="Biglietti Acquistati" apiEndpoint="/orders/purchased" ticketType="purchased" />
}
