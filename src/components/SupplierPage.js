import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>Supplier Page</h1>
            <br />
            <p>Page used to give quotes.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor