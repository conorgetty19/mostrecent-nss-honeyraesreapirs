import { Link } from "react-router-dom"

export const Customer = ({id, fullName }) => {
    return <section className="customer">
        <div>
            <Link to={`/customers/${id}`}>Name: {fullName}</Link>
        </div>
    </section>
}