import { useParams } from "react-router-dom"
import TicketList from "../components/TicketList"

export default function TicketsPage() {
    const { ticketType } = useParams()

    const titles = {
        purchased: "Biglietti Acquistati",
        mytickets: "I miei Biglietti in Vendita",
        tickets: "Biglietti Disponibili"
    }

    return <TicketList title={titles[ticketType] || "Biglietti"} ticketType={ticketType} />
}
