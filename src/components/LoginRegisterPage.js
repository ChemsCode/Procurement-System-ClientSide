import { Link } from "react-router-dom";

const StyledLink = {
  margin: "1rem",
  textDecoration: "none",
  color: "black",
};

const LinkPage = () => {
  return (
    <section>
      <button>
        <Link style={StyledLink} to="/login">Login</Link>
      </button>
      <button>
        <Link style={StyledLink} to="/register">Register</Link>
      </button>
      
    </section>
  );
};

export default LinkPage;
