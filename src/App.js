import React from "react";
import TypeOfAccount from "./TypeOfAccount";
import RegisterCompany from './RegisterCompany';
import RegisterUser from './RegisterUser';
import RegisterSupplier from './RegisterSupplier';
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="App">
    <Routes>
          <Route path="/" element={<TypeOfAccount/>}/>
          <Route path="/register-company" element={<RegisterCompany/>}/>
          <Route path="/register-user" element={<RegisterUser/>}/>
          <Route path="/register-supplier" element={<RegisterSupplier/>}/>
          <Route path="/login" element={<Login/>}/>
    </Routes>
    </main>
  );
}

export default App;
