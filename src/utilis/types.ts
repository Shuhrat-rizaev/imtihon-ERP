// types.ts
export interface Company {
  name: string;
  inn: string;
  created_at: string;
  license_url: string;
}

export interface UserData {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
  birthday: string;
  gender: string;
  role: string;
  company: Company;
}
export interface CompanyData {
  id: number;
  name: string;
  owner: number;
  logo: string | null;
  stir: string;
  created_at: string;
  updated_at: string;
  license_file: string;
}
interface User {
  full_name: string;
  gender: string;
  phone_number: string;
  passport_number: string;
  jshshr: string;
  birthday: string;
}

export interface Employee {
  id: number;
  branch_name: string;
  start_time: string;
  end_time: string;
  official_salary: string;
  salary: string;
  position: string;
  user_full_name: string;
  user_role: string;
  user: User;
}
