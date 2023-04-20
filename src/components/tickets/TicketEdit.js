import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router-dom"
import { editTicketAndNavigateUser, getTicketAndUpdateState } from "../ApiManager"

export const TicketEdit = () => {
    const navigate = useNavigate()

    // TODO: This state object should not be blank
    const [ticket, updateTicket] = useState({
        //properties
        description: "",
        emergency: false
    })

    // TODO: What is the variable in which you stored the route parameter?
    const { ticketId } = useParams()

    // TODO: Get the ticket info from the API and update state
    useEffect(() => {
        getTicketAndUpdateState(ticketId, updateTicket)
    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Write the fetch for the PUT request to replace the object being edited
        editTicketAndNavigateUser(ticket.id, ticket, navigate)
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                            const copy = {...ticket}
                            copy.description = evt.target.value
                            updateTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                            const copy = {...ticket}
                            copy.emergency = evt.target.checked
                            updateTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}