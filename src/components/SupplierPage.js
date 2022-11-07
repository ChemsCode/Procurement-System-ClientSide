import { Link } from "react-router-dom"
import ItemRequests from "./ItemRequests"

const Editor = () => {
    return (
        <section>
            <h1>Supplier Page</h1>
            <br />
            <ItemRequests/>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor