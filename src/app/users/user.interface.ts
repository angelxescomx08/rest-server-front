import { type valuesOf } from '../shared/interfaces/shared.interfaces';

export const ROL = {
  ADMIN_ROL: 'ADMIN_ROL',
  USER_ROL: 'USER_ROL',
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
