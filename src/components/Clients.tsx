import { useEffect, useState } from "react";
import { ApiClient } from "../utilis/Axiosintance";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import icon from "../assets/images/Icon (13).svg";

type Client = {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  branch_name: string;
  license_file: string | null;
  created_at: string;
  updated_at: string;
};

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getClients = async () => {
    try {
      const res = await ApiClient.get("/company/clients/");
      setClients(res.data.results);
      console.log(res.data.results);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto w-[95%] flex">
        {/* Sidebar */}
        <div className="flex flex-col gap-3 py-5 border-r w-[204px] h-[684px]">
          {[
            { label: "Bosh sahifa", path: "/Home" },
            { label: "Xodimlar ro’yxati", path: "/Employees" },
            { label: "Mijozlar", path: "/clients" },
            { label: "Smenalar", path: "/salary-report" },
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

        {/* Main content */}
        <div className="p-4 w-full">
          <div className="mb-4">
            <input
              type="text"
              className="w-[400px] p-2 border rounded-lg"
              placeholder="Izlash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-3">Ism</th>
                <th className="p-3">Telefon</th>
                <th className="p-3">Filial</th>
                <th className="p-3">Ro'yxatdan o'tgan sana</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-blue-600 font-medium cursor-pointer">
                    {client.name}
                  </td>
                  <td className="p-3">{client.phone}</td>
                  <td className="p-3">{client.branch_name}</td>
                  <td className="p-3">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
