import { Link, useNavigate } from "react-router-dom"

const StyledLink = {
    margin: "1rem",
    textDecoration: "none",
    color: "black",
  };

const CompanyPage = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
  
    return (
      <section>
        <h1>Choose Either Options</h1>
        <br />
        <button>
          <Link style={StyledLink} to="/approve-requests">
            Approve Requests
          </Link>
        </button>
        <button>
          <Link style={StyledLink} to="/items-purchased-company">
            Items Purchased
          </Link>
        </button>
        <div className="flexGrow">
          <button onClick={goBack}>Go Back</button>
        </div>
      </section>
    );
}

export default CompanyPage