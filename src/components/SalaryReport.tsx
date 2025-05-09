import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import icon from "../assets/images/Icon (13).svg";
import { ApiClient } from "../utilis/Axiosintance";
import { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  TimePicker,
  Popconfirm,
  message,
  notification,
} from "antd";
import dayjs from "dayjs";

interface Shift {
  id: number;
  name: string;
  branch: number;
  branch_name: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

const SalaryReport = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [form] = Form.useForm();

  const fetchShifts = async () => {
    try {
      const res = await ApiClient.get(`/company/shifts/2/`);

      setShifts(res.data);
    } catch (error) {
      console.error("GET error:", error);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleAdd = () => {
    setEditingShift(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (shift: Shift) => {
    setEditingShift(shift);
    form.setFieldsValue({
      name: shift.name,
      start_time: dayjs(shift.start_time, "HH:mm:ss"),
      end_time: dayjs(shift.end_time, "HH:mm:ss"),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await ApiClient.delete(`company/shift-detail/${id}/`);
      message.success("Smena o'chirildi");
      fetchShifts();
    } catch (error) {
      message.error("Xatolik yuz berdi");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        name: values.name,
        branch: 2,
        start_time: values.start_time.format("HH:mm:ss"),
        end_time: values.end_time.format("HH:mm:ss"),
      };

      if (editingShift) {
        await ApiClient.put(`company/shift-detail/${editingShift.id}/`, data);
        message.success("Smena tahrirlandi");
      } else {
        await ApiClient.post(`/company/shift-create/`, data);
        notification.success;
      }

      setIsModalOpen(false);
      fetchShifts();
    } catch (error) {
      console.error(error);
      message.error("Xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "Smena nomi",
      dataIndex: "name",
    },
    {
      title: "Boshlanish vaqti",
      dataIndex: "start_time",
    },
    {
      title: "Tugash vaqti",
      dataIndex: "end_time",
    },
    {
      title: "Amallar",
      render: (_: any, record: Shift) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Tahrirlash
          </Button>
          <Popconfirm
            title="O'chirishga ishonchingiz komilmi?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button type="link" danger>
              O'chirish
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const filteredShifts = shifts.filter((shift) =>
    shift.name.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Content */}
        <div className="p-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Izlash..."
              className="w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" onClick={handleAdd}>
              Smena qo‘shish
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={filteredShifts}
            rowKey="id"
            pagination={false}
          />

          <Modal
            open={isModalOpen}
            title={editingShift ? "Smena tahrirlash" : "Yangi smena qo‘shish"}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleSubmit}
            okText="Saqlash"
            cancelText="Bekor qilish"
          >
            <Form layout="vertical" form={form}>
              <Form.Item
                label="Smena nomi"
                name="name"
                rules={[{ required: true, message: "Smena nomini kiriting" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Boshlanish vaqti"
                name="start_time"
                rules={[
                  { required: true, message: "Boshlanish vaqtini tanlang" },
                ]}
              >
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
              <Form.Item
                label="Tugash vaqti"
                name="end_time"
                rules={[{ required: true, message: "Tugash vaqtini tanlang" }]}
              >
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SalaryReport;
