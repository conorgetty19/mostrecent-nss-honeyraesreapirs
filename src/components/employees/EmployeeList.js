import { useEffect, useState } from "react"
import "./Employees.css"
import { Employee } from "./Employee"
import { getAllEmployees } from "../ApiManager"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            getAllEmployees()
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee 
                key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
        }
    </article>
}