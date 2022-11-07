import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>Page to purchase items which have received a quote</h1>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Admin