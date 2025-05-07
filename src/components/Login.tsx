import { useState } from "react";
import { ApiClient } from "../utilis/Axiosintance";
import { useNavigate } from "react-router-dom";
import images from "../assets/images/IMAGE.png";
import union from "../assets/images/Union.png";
import { Button, notification } from "antd";
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await ApiClient.post("accounts/login/", {
        phone_number: phoneNumber,
        password,
      });
      console.log(res);
      const token = res.data.data.tokens.access;
      localStorage.setItem("accessToken", res.data.data.tokens.access);
      localStorage.setItem("refreshToken", res.data.data.tokens.refresh);
      console.log("TOKEN:", token);
      console.log("Login muvaffaqiyatli:", res);
      navigate("/Home");
    } catch (err: any) {
      notification.config({
        placement: "bottomRight",
        bottom: 50,
        duration: 3,
        rtl: true,
      });

      console.error("Xatolik:", err.response?.data || err.message);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <img src={images} alt="Images" className="w-[720px] h-[550px]" />
      </div>

      <div className="flex flex-col items-center text-center  justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col  gap-5 w-[740] items-center"
        >
          <img src={union} alt="Union" className="w-[58px]" />
          <div>
            <h1 className="text-xl">NovEnter</h1>
            <p>Crm tizim bilan biznesingizni rivojlantiring</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Telefon raqamingizni kiriting"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Parolingizni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <Button
            htmlType="submit"
            className=""
            color="primary"
            variant="solid"
          >
            Tizimga kirish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
