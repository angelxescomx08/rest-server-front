import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.development';
import {
  ResponseCreateUser,
  ResponseGetUsers,
  User,
} from '../interfaces/user.interface';
import { Prettify } from '../../shared/interfaces/shared.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(page: number = 1, limit: number = 5) {
    const params = new HttpParams();
    params.set('page', page);
    params.set('limit', limit);
    const token = this.authService.getToken();
    return this.http
      .get<ResponseGetUsers>(`${environment.baseUrl}/api/user`, {
        params,
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        catchError((err) =>
          of({
            total: 0,
            users: [],
          })
        )
      );
  }

  createUser(user: Prettify<Omit<User, 'state' | 'google' | 'img'>>) {
    const token = this.authService.getToken();
    return this.http.post<ResponseCreateUser>(
      `${environment.baseUrl}/api/user`,
      user,
      {
        headers: {
          'x-token': token,
        },
      }
    );
  }
}
