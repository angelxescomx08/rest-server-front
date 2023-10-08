import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  KEY_LOCAL_STORAGE_TOKEN,
  LoginBody,
  type ResponseLogin,
} from '../interfaces/login.interface';
import { ResponseVerifyToken } from '../interfaces/verify-token.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken() {
    const token = localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
    return token ?? '';
  }

  login(body: LoginBody) {
    return this.http.post<ResponseLogin>(
      `${environment.baseUrl}/api/auth/login`,
      body
    );
  }

  verifyToken(token: string) {
    return this.http.get<ResponseVerifyToken>(
      `${environment.baseUrl}/api/auth/verify-token`,
      {
        headers: {
          'x-token': token,
        },
      }
    );
  }
}
