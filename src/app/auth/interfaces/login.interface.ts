import { type User } from 'src/app/users/interfaces/user.interface';

export interface LoginBody {
  email: string;
  password: string;
}

export type SuccessResponseLogin = {
  success: true;
  user: User;
  token: string;
};

export type FailedResponseLogin = {
  success: false;
};

export type ResponseLogin = {
  message: string;
} & (SuccessResponseLogin | FailedResponseLogin);

export const KEY_LOCAL_STORAGE_TOKEN = 'TOKEN';
