import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTicketAndNavigateUser } from "../ApiManager"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked button")
        // TODO: Create the object to be saved to the API
        /* 
        {
            "userId": 3,
            "description": "Saepe ex sapiente deserunt et voluptas fugiat vero quasi. Ipsam est non ipsa. Occaecati rerum ipsa consequuntur. Ratione commodi unde sint non rerum. Sit quia et aut sunt.",
            "emergency": false,
            "dateCompleted": "Fri Apr 29 2022 14:02:20 GMT-0500 (Central Daylight Time)"
        }
        */
        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        // TODO: Perform the fetch() to POST the object to the API
        createTicketAndNavigateUser(ticketToSendToAPI, navigate)
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.description = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (event)=> {
                                const copy = {...ticket}
                                copy.emergency = event.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={
                (clickEvent) => {handleSaveButtonClick(clickEvent)}
            } className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}