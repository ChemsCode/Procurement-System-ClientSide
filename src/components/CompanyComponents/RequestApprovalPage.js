import { Link, useNavigate } from "react-router-dom"
import RequestApprovalList from "./RequestApprovalList";

const RequestApprovalPage = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>Request Approvals</h1>
            <br />
            <RequestApprovalList/>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default RequestApprovalPage