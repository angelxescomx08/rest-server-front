import {
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { KEY_LOCAL_STORAGE_TOKEN } from '../interfaces/login.interface';
import { catchError, map, tap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const privateCanActivate: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }
  return authService.verifyToken(token).pipe(
    catchError((error: HttpErrorResponse, data) => {
      if (error.name === 'HttpErrorResponse') {
        return of({
          success: false,
          message: 'Error al establecer conexión con el backend',
        });
      }
      return data;
    }),
    tap((success) => {
      if (!success) {
        localStorage.clear();
        router.navigateByUrl('/auth/login');
      }
    }),
    map((res) => res.success)
  );
};

export const NameGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }
  return authService.verifyToken(token).pipe(
    catchError((error: HttpErrorResponse, data) => {
      if (error.name === 'HttpErrorResponse') {
        return of({
          success: false,
          message: 'Error al establecer conexión con el backend',
        });
      }
      return data;
    }),
    tap((success) => {
      if (!success) {
        localStorage.clear();
        router.navigateByUrl('/auth/login');
      }
    }),
    map((res) => res.success)
  );
};
