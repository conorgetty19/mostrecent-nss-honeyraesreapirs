export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
        .then(res => res.json())
}

export const getCustomerDetails = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(res => res.json())
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then(res => res.json())
}

export const getEmployeeDetails = (employeeId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(res => res.json())
}

export const getLoggedInCustomer = (honeyUserObjectID) => {
    return fetch(`http://localhost:8088/customers?userId=${honeyUserObjectID}`)
        .then(res => res.json())
}

export const changeCustomerProfile = (profile) => {
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
}

export const getLoggedInEmployee = (honeyUserObjectID) => {
    return fetch(`http://localhost:8088/employees?userId=${honeyUserObjectID}`)
        .then(res => res.json())
}

export const changeEmployeeProfile = (profile) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
}

export const getAndSetAllTickets = (setTickets) => {
    fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then(res => res.json())
        .then((ticketArray) => {
            setTickets(ticketArray)
        })
}

export const getAllEmployeesAndUsers = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`)
        .then(res => res.json())
}

export const deleteServiceTicket = (ticketObjectId, setTickets) => {
    fetch(`http://localhost:8088/serviceTickets/${ticketObjectId}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(() => {
            getAndSetAllTickets(setTickets)
        })
}

export const editTicket = (ticketObjectId, copy, setTickets) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketObjectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(copy)
    })
        .then(res => res.json())
        .then(getAndSetAllTickets(setTickets))
}

export const employeeClaimTicket = (userEmployee, ticketObject, setTickets) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeId: userEmployee.id,
            serviceTicketId: ticketObject.id
        })
    })
        .then(res => res.json())
        .then(() => {
            getAndSetAllTickets(setTickets)
        })
}

export const getTicketAndUpdateState = (ticketId, updateTicket) => {
    fetch (`http://localhost:8088/serviceTickets?id=${ticketId}`)
        .then(res => res.json())
        .then((data) => {
            const ticketObject = data[0]
            updateTicket(ticketObject)
        })
}

export const editTicketAndNavigateUser = (ticketId, ticket, navigate) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/tickets")
        })
}

export const createTicketAndNavigateUser = (ticketToSendToAPI, navigate) => {
    return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(res => res.json())
        .then(()=> {
            navigate("/tickets")
        })
    }