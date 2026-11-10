export type UserRole = 'student' | 'admin' | 'bookstore-user';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface StudentData extends UserData {
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  dateOfBirth: string;
  subjects: string[];
  hobbies: string[];
  address: string;
  state: string;
  city: string;
}

export interface BookData {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
}

export interface TextBoxData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}
