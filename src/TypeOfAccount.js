import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledLink ={
  margin: "1rem",
  textDecoration: "none",
  color: 'black'

};


const TypeOfAccount = () => {
  return (
    <section>
      <button>
        <Link to="/register-company" style={StyledLink} >Company Account</Link>
      </button>
      <button>
        <Link to="/register-user" style={StyledLink}>Employee Account</Link>
      </button>
      <button>
        <Link to="/register-supplier" style={StyledLink}>Supplier Account</Link>
      </button>
    </section>
  );
};

export default TypeOfAccount;
