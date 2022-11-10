import { useNavigate } from "react-router-dom"
import ItemRequests from "./ItemRequests"

const Editor = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>Supplier Page</h1>
            <br />
            <ItemRequests/>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Editor