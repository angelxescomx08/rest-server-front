import { type valuesOf } from '../../shared/interfaces/shared.interfaces';

export const ROL = {
  ADMIN_ROL: 'ADMIN_ROL',
  USER_ROL: 'USER_ROL',
  VENTAS_ROL: 'VENTAS_ROL',
} as const;

export interface User {
  email: string;
  password: string;
  name: string;
  rol: valuesOf<typeof ROL>;
  state: boolean;
  google: boolean;
  img?: string;
}

export interface ResponseGetUsers {
  total: number;
  users: User[];
}

export type ResponseCreateUser = {} & (
  | {
      success: true;
      user: User;
    }
  | { success: false; errors: unknown }
);
