import { type User } from 'src/app/users/interfaces/user.interface';

export interface LoginBody {
  email: string;
  password: string;
}

export type ResponseLogin =
  | {
      success: true;
      message: string;
      user: User;
      token: string;
    }
  | { success: false; message: string };
