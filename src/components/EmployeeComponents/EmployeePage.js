import { useNavigate, Link } from "react-router-dom";

const StyledLink = {
  margin: "1rem",
  textDecoration: "none",
  color: "black",
};

const EmployeePage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Choose Either Options</h1>
      <br />
      <button>
        <Link style={StyledLink} to="/quote-request">
          Request Quote
        </Link>
      </button>
      <button>
        <Link style={StyledLink} to="/purchase-items">
          Purchase Item
        </Link>
      </button>
      <button>
        <Link style={StyledLink} to="/items-purchased-employee">
          Items Purchased
        </Link>
      </button>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};

export default EmployeePage;
