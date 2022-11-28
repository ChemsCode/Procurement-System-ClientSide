import { useNavigate } from "react-router-dom";
import ItemsSold from "./ItemsSold";

const SalesPage = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>Items Sold</h1>
            <br />
            <ItemsSold/>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default SalesPage