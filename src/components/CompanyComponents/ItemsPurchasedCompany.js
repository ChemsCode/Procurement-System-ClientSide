import { Link, useNavigate } from "react-router-dom"
import ItemsPurchasedByCompanyList from "./ItemsPurchasedByCompanyList";

const ItemsPurchasedCompany = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>List of items purchased</h1>
            <br />
             <ItemsPurchasedByCompanyList/>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default ItemsPurchasedCompany