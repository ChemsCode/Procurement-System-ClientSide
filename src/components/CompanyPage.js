import { Link } from "react-router-dom"
import Users from './Users';

const Admin = () => {
    return (
        <section>
            <h1>Company page</h1>
            <br />
            <Users />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin