import React from 'react';
import { Link, useNavigate } from "react-router-dom"

const CompanyPage = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section>
            <h1>Requests for items Above $5000</h1>
            <br />
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default CompanyPage