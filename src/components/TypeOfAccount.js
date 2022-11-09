import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledLink = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black'

};


const TypeOfAccount = () => {
  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <button>
        <Link to="" style={StyledLink} >Company Account</Link>
      </button>
      <button>
        <Link to="" style={StyledLink}>Employee Account</Link>
      </button>
      <button>
        <Link to="" style={StyledLink}>Supplier Account</Link>
      </button>
    </section>
  );
};

export default TypeOfAccount;
