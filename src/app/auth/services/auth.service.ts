import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginBody, type ResponseLogin } from '../interfaces/login.interface';
import { ResponseVerifyToken } from '../interfaces/verify-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(body: LoginBody) {
    return this.http.post<ResponseLogin>(
      `${this.baseURL}/api/auth/login`,
      body
    );
  }

  verifyToken(token: string) {
    return this.http.get<ResponseVerifyToken>(
      `${this.baseURL}/api/auth/verify-token`,
      {
        headers: {
          'x-token': token,
        },
      }
    );
  }
}
