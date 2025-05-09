import { useEffect, useState } from "react";
import { ApiClient } from "../utilis/Axiosintance";
import icon from "../assets/images/Icon (13).svg";
import restangle from "../assets/images/Rectangle.png";
import avatar from "../assets/images/avatar.svg";
import icon1 from "../assets/images/Icon.svg";
import icon2 from "../assets/images/Icon1.svg";
import bcround from "../assets/images/Object 1.png";
import { CompanyData, UserData } from "../utilis/types";
import { Link } from "react-router-dom";

const Cards = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [company, setCompany] = useState<CompanyData | null>(null);
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await ApiClient.get<UserData>("/accounts/me/");
        console.log(res.data);
        setUserData(res.data);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };
    const fetchCompany = async () => {
      try {
        const res = await ApiClient.get<CompanyData>("/company/get/");
        setCompany(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchAccount();
    fetchCompany();
  }, []);

  return (
    <div className="container mx-auto w-[95%] flex">
      <div className="flex flex-col gap-3 py-5 border-r w-[254px] h-[684px]">
        {[
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

      <div className="p-10 bg-[#F5F7FA] w-full">
        <div
          className="bg-no-repeat bg-cover bg-center w-[827px] h-[200px] rounded-2xl text-white relative z-10"
          style={{ backgroundImage: `url(${restangle})` }}
        >
          <div className="flex px-5 items-center justify-between">
            <div className="flex gap-4">
              <img src={avatar} alt="Avatar" className="w-[86px]" />
              <div className="flex flex-col gap-1 items-start w-[272px]">
                <p>Xush kelibsiz!</p>
                <h1 className="text-white text-4xl font-semibold">
                  {userData?.full_name || "Foydalanuvchi"}
                </h1>
                <p className="bg-white text-black w-[62px] text-center rounded-lg">
                  {userData?.role || "Lavozim"}
                </p>
              </div>
            </div>
            <div className="border p-5 mt-5 w-[285px] h-[147px] rounded-xl bg-white/20 backdrop-blur shadow-md relative z-10">
              <p>Finance</p>
              <p>ID: {userData?.id || "Noma'lum"}</p>
              <p>Current balance:</p>
              <p className="text-2xl">557 000 so’m</p>
            </div>
          </div>
          <img src={bcround} alt="Object" className="absolute top-0 right-0" />
        </div>
        <div className="flex justify-between mt-10">
          {["Vazifalar", "Rasmiy oylik", "Norasmin oylik"].map((label, i) => (
            <div
              key={i}
              className="w-[250px] h-[104px] rounded-2xl p-3 flex bg-white gap-4 items-center"
            >
              <img src={icon1} alt="" className="w-[20px] h-[20px]" />
              <div className="flex flex-col items-center text-center">
                <p className="text-[#90A0B7]">{label}</p>
                <p className="text-2xl font-semibold">0</p>
                <p>1 218 000 so’m</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-20 gap-10 bg-white p-5 rounded-2xl">
          <div>
            <p className="flex font-bold gap-2">
              <img src={icon2} alt="Icon" />
              Ma'lumotlar
            </p>
            <div className="flex flex-col gap-5 text-[#192A3E] mt-2">
              <p>Telefon raqam: {userData?.phone_number || "—"}</p>
              <p>Email: {userData?.email || "—"}</p>
              <p>Tug‘ilgan sana: {userData?.birthday || "—"}</p>
              <p>Jinsi: {userData?.gender || "—"}</p>
            </div>
          </div>
          <div className="flex flex-col text-[#192A3E] justify-end gap-5">
            <p>Kompaniya nomi: {company?.name || "—"}</p>
            <p>INN: {company?.stir || "—"}</p>
            <p>Ro‘yxatdan o‘tgan sana: {company?.created_at || "—"}</p>
            <p>
              Lizensiya:{" "}
              <a
                href={company?.license_file || "#"}
                className="text-blue-600 underline"
              >
                Yuklab olish
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
