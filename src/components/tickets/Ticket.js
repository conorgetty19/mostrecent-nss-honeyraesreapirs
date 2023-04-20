import { Link } from "react-router-dom"
import { deleteServiceTicket, editTicket, employeeClaimTicket } from "../ApiManager"

export const Ticket = ({ ticketObject, currentUser, employees, getAndSetAllTickets, setTickets }) => {
    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    //correct this later
    const userEmployee = employees.find(employee => employee.userId === currentUser.id && currentUser.staff)

    const canClose = () => {
        if (userEmployee && assignedEmployee && userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        }
        else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                deleteServiceTicket(ticketObject.id, setTickets)
                
            }} className="ticket__delete">Delete Ticket</button>
        }
        else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        editTicket(ticketObject.id, copy, setTickets)
    }


    const buttonOrNot = () => {
        if (currentUser.staff) {
            return <button
                onClick={() => {
                    employeeClaimTicket(userEmployee, ticketObject, setTickets)
                }}
            >Claim</button>
        }
        else {
            return ""
        }
    }

    return (
        <section className="ticket">
            <header>
                {
                    currentUser.staff ? `Ticket ${ticketObject.id}`
                        : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
            </header>
            <section>{ticketObject.description}</section>
            <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
            <footer>
                {
                    (ticketObject.employeeTickets.length) ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                        : buttonOrNot()
                }
                {
                    canClose()
                }
                {
                    deleteButton()
                }
            </footer>
        </section>
    )
}

//key={ticketObject.id}