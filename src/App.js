import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Supplier from "./components/SupplierPage";
import Business from "./components/CompanyPage";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/EmployeePage";
import LinkPage from "./components/LoginRegisterPage";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
  Company: 1892,
  Supplier: 1738,
  Employee: 1776
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Supplier]} />}>
            <Route path="editor" element={<Supplier />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Company]} />}>
            <Route path="admin" element={<Business />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Employee]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
