import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginBody } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(body: LoginBody) {
    return this.http.post(`${this.baseURL}/api/auth/login`, body);
  }
}
