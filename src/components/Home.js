import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const StyledLink = {
  margin: "1rem",
  textDecoration: "none",
  color: "black",
};

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
      await logout();
      navigate('/linkpage');
  }

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <button>
        <Link style={StyledLink} to="/supplier">
          Supplier Page
        </Link>
      </button>
      <button>
        <Link style={StyledLink} to="/company">
          Company Page
        </Link>
      </button>
      <button>
        <Link style={StyledLink} to="/employee">
          Employee Page
        </Link>
      </button>

      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
