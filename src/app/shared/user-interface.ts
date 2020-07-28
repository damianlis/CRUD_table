export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  registrationDate: Date;
  enabled: boolean;
}
