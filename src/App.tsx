import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
// import Emploees from "./components/Emploees";
import Attendance from "./components/Attendance";
import Clients from "./components/Clients";
import SalaryReport from "./components/SalaryReport";
import Employees from "./components/Emploees";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/salary-report/" element={<SalaryReport />} />
    </Routes>
  );
}

export default App;
