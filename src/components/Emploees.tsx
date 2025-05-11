import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/images/Icon (13).svg";
import { ApiClient } from "../utilis/Axiosintance";
import Navbar from "./Navbar";
import { Employee } from "../utilis/types";
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  message,
} from "antd";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await ApiClient.get("/employee/employees/branch/1/");
      setEmployees(res.data.results);
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const values = await form.validateFields();

      const data = {
        user: {
          full_name: values.full_name,
          phone_number: values.phone_number,
          birth_date: values.birthday.format("YYYY-MM-DD"),
          gender: values.gender,
          salary_type: values.salary_type,
          jshshr: values.jshshr,
          passport_number: values.passport_number,
        },
        branch_id: 1,
        department_id: 1,
        shift_id: 0,
        position: values.user_role,
        salary: Number(values.salary),
        official_salary: Number(values.official_salary),
        start_time: values.start_time.format("HH:mm:ss"),
        end_time: values.end_time.format("HH:mm:ss"),
      };

      const res = await ApiClient.post("/employee/employees/", data);
      message.success("Xodim muvaffaqiyatli qo‘shildi");

      form.resetFields();
      setIsModalOpen(false);
      getEmployees();
      console.log(res);
    } catch (error: any) {
      console.error("Qo‘shishda xatolik:", error.response?.data);
      message.error(
        error?.response?.data?.detail || "Xodim qo‘shishda xatolik yuz berdi"
      );
    }
  };

  if (loading) return <p>Yuklanmoqda...</p>;

  const filteredEmployees = employees.filter((emp) =>
    emp.user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto w-[95%] flex">
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

        <div className="p-4 w-full">
          <div className="mb-4 flex items-center justify-between">
            <input
              type="text"
              className="w-[400px] p-2 border rounded-lg"
              placeholder="Izlash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              + Yangi xodim
            </Button>
          </div>

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
                  <td className="p-3">
                    {emp.start_time} - {emp.end_time}
                  </td>
                  <td className="p-3">{emp.user.birthday || "—"}</td>
                  <td className="p-3">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Yangi xodim qo‘shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddEmployee}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="F.I.SH"
            name="full_name"
            rules={[{ required: true, message: "Ismni kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telefon raqam"
            name="phone_number"
            rules={[{ required: true, message: "Telefon raqamni kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rol"
            name="user_role"
            rules={[{ required: true, message: "Rolni tanlang" }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="employee">Employee</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Tug‘ilgan sana"
            name="birthday"
            rules={[{ required: true, message: "Sana tanlang" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Oylik"
            name="salary"
            rules={[{ required: true, message: "Oylikni kiriting" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Rasmiy oylik"
            name="official_salary"
            rules={[{ required: true, message: "Rasmiy oylikni kiriting" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Ish boshlanish vaqti"
            name="start_time"
            rules={[
              { required: true, message: "Ish boshlanish vaqtini tanlang" },
            ]}
          >
            <TimePicker className="w-full" format="HH:mm:ss" />
          </Form.Item>

          <Form.Item
            label="Ish tugash vaqti"
            name="end_time"
            rules={[{ required: true, message: "Ish tugash vaqtini tanlang" }]}
          >
            <TimePicker className="w-full" format="HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;
