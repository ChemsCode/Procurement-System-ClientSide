import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import SupplierPage from "./components/SupplierComponents/SupplierPage";
import CompanyPage from "./components/CompanyComponents/CompanyPage";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import QuoteRequestPage from "./components/EmployeeComponents/QuoteRequestPage";
import LoginRegisterPage from "./components/LoginRegisterPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import EmployeePage from "./components/EmployeeComponents/EmployeePage";
import PurchaseItemsPage from "./components/EmployeeComponents/PurchaseItemsPage";
import ItemsPurchasedEmployee from "./components/EmployeeComponents/itemsPurchasedEmployee";
import ItemRequestsPage from "./components/SupplierComponents/ItemRequestsPage";
import SalesPage from "./components/SupplierComponents/SalesPage";
import RequestApprovalPage from "./components/CompanyComponents/RequestApprovalPage";
import ItemsPurchasedCompany from "./components/CompanyComponents/ItemsPurchasedCompany";
import { Routes, Route } from "react-router-dom";


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
        <Route path="linkpage" element={<LoginRegisterPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Supplier]} />}>
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="give-quotes" element={<ItemRequestsPage />} />
            <Route path="sales" element={<SalesPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Company]} />}>
            <Route path="company" element={<CompanyPage />} />
            <Route path="approve-requests" element={<RequestApprovalPage />} />
            <Route path="items-purchased-company" element={<ItemsPurchasedCompany />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Employee]} />}
          >
            <Route path="employee" element={<EmployeePage />} />
            <Route path="quote-request" element={<QuoteRequestPage />} />
            <Route path="purchase-items" element={<PurchaseItemsPage />} />
            <Route path="items-purchased-employee" element={<ItemsPurchasedEmployee />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
