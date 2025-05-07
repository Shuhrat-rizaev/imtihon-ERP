import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/images/Icon (13).svg";
import { ApiClient } from "../utilis/Axiosintance";
import Navbar from "./Navbar";
import { Employee } from "../utilis/types";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Izlash so'zi uchun yangi holat

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await ApiClient.get("/employee/employees/branch/1/");
        console.log("API javobi:", res.data); // API javobini tekshirish
        setEmployees(res.data.results); // Xodimlarni o‘rnatish
      } catch (error) {
        console.error("Xatolik:", error); // Xato bo‘lsa logda chiqishi
      } finally {
        setLoading(false); // Yuklanish tugadi
      }
    };

    getEmployees();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;

  // Xodimlarni izlash so‘ziga qarab filtrlaymiz
  const filteredEmployees = employees.filter(
    (emp) => emp.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) // Nomiga mos kelishini tekshirish
  );

  return (
    <div>
      <Navbar />

      <div className="container mx-auto w-[95%] flex">
        <div className="flex flex-col gap-3 py-5 border-r w-[204px] h-[684px]">
          {[
            { label: "Bosh sahifa", path: "/Home" },
            { label: "Xodimlar ro’yxati", path: "/Employees" },
            { label: "Xodimlar davomati", path: "/attendance" },
            { label: "Mijozlar", path: "/clients" },
            { label: "Oylik hisobot", path: "/salary-report" },
          ].map((item, index) => (
            <Link
              to={item.path}
              className="flex gap-2 items-center hover:text-blue-600 text-[#525B75] font-semibold"
              key={index}
            >
              <img src={icon} alt="Icon" className="w-[16px] h-[16px]" />
              <p>{item.label}</p>
            </Link>
          ))}
        </div>

        <div className="p-4 w-full">
          <div className="mb-4">
            <input
              type="text"
              className="w-[400px] p-2 border rounded-lg"
              placeholder="Izlash..."
              value={searchTerm} //
              onChange={(e) => setSearchTerm(e.target.value)} // Foydalanuvchi kiritgan so'zni saqlash
            />
          </div>

          {/* Xodimlar ro'yxati */}
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-3">F.I.SH</th>
                <th className="p-3">Role</th>
                <th className="p-3">Telefon</th>
                <th className="p-3">Filial</th>
                <th className="p-3">Smena</th>
                <th className="p-3">Tug‘ilgan sana</th>
                <th className="p-3">...</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-blue-600 font-medium cursor-pointer">
                    {emp.user.full_name}
                  </td>
                  <td className="p-3">{emp.user_role || "—"}</td>
                  <td className="p-3">{emp.user.phone_number || "—"}</td>
                  <td className="p-3">{emp.branch_name || "—"}</td>
                  <td className="p-3">{`${emp.start_time} - ${emp.end_time}`}</td>
                  <td className="p-3">{emp.user.birthday || "—"}</td>
                  <td className="p-3">{emp.user.birthday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
