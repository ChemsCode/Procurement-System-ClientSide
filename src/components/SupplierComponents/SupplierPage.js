import { Link, useNavigate } from "react-router-dom"

const StyledLink = {
    margin: "1rem",
    textDecoration: "none",
    color: "black",
  };

const SupplierPage = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
  
    return (
      <section>
        <h1>Choose Either Options</h1>
        <br />
        <button>
          <Link style={StyledLink} to="/give-quotes">
            Give Quotes
          </Link>
        </button>
        <button>
          <Link style={StyledLink} to="/sales">
            Sales
          </Link>
        </button>
        <div className="flexGrow">
          <button onClick={goBack}>Go Back</button>
        </div>
      </section>
    );
}

export default SupplierPage