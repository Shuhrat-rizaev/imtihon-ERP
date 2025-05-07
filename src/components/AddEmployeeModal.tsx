import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
import { ApiClient } from "../utilis/Axiosintance";
import { Employee } from "../utilis/types";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeAdded: (newEmployee: Employee) => void;
}

const AddEmployeeModal = ({
  isOpen,
  onClose,
  onEmployeeAdded,
}: AddEmployeeModalProps) => {
  const [form] = Form.useForm();

  const handleAddEmployee = async (values: any) => {
    const newEmployee = {
      user: {
        full_name: values.fullName,
        phone_number: values.phoneNumber,
        birthday: values.birthday.format("YYYY-MM-DD"),
      },
      user_role: values.role,
      branch_name: values.branch,
    };

    try {
      const response = await ApiClient.post(
        "/employee/employees/branch/1/",
        newEmployee
      );
      onEmployeeAdded(response.data);
      form.resetFields(); 
      onClose();
    } catch (error) {
      console.error("Xodim qo'shishda xatolik", error);
    }
  };

  return (
    <Modal
      title="Yangi Xodim Qo'shish"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form form={form} onFinish={handleAddEmployee}>
        <Form.Item
          label="F.I.SH"
          name="fullName"
          rules={[{ required: true, message: "F.I.SHni kiriting!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telefon raqami"
          name="phoneNumber"
          rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Roli"
          name="role"
          rules={[{ required: true, message: "Rolingizni tanlang!" }]}
        >
          <Select>
            <Select.Option value="Manager">Manager</Select.Option>
            <Select.Option value="Employee">Xodim</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Filial"
          name="branch"
          rules={[{ required: true, message: "Filialni kiriting!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tug‘ilgan sana"
          name="birthday"
          rules={[{ required: true, message: "Tug‘ilgan sanani kiriting!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between">
            <Button onClick={onClose} type="default">
              Bekor qilish
            </Button>
            <Button type="primary" htmlType="submit">
              Xodimni qo'shish
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
