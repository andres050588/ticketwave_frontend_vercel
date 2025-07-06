import React from "react"
import TicketList from "../components/TicketList"

export default function MyPurchasedTicketsPage() {
    return <TicketList title="Biglietti Acquistati" limit={6} apiEndpoint="/orders/purchased" showSeeAllButton={true} />
}
