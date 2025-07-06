import React from "react"
import TicketList from "../components/TicketList"

export default function MySelledTicketsPage() {
    return <TicketList title="I miei Biglietti in Vendita" limit={6} apiEndpoint="/tickets/mytickets" ticketType="mytickets" showSeeAllButton={true} />
}
