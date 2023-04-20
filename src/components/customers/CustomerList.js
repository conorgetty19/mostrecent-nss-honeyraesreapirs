import { useEffect, useState } from "react"
import "./Customers.css"
import { Customer } from "./Customer"
import { getAllCustomers } from "../ApiManager"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            getAllCustomers()
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer
                key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName}
                email={customer.email}  />)
        }
    </article>
}