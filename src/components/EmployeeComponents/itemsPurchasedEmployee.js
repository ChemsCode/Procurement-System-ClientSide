import { Link, useNavigate } from "react-router-dom"
import PurchasesItemsEmployeeList from "./PurchasedItemsEmployeeList";

const ItemsPurchasedEmployee = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>List of items purchased</h1>
            <br />
            <PurchasesItemsEmployeeList/>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default ItemsPurchasedEmployee