import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { KEY_LOCAL_STORAGE_TOKEN } from '../interfaces/login.interface';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, tap, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const PublicCanMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const token = localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
  if (!token) return true;
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
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
    tap((res) => {
      if (res.success) {
        router.navigateByUrl('/dashboard/user');
      } else {
        localStorage.clear();
      }
    }),
    map((res) => !res.success)
  );
};

export const PublicCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const token = localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
  if (!token) return true;
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
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
    tap((res) => {
      if (res.success) {
        router.navigateByUrl('/dashboard/user');
      } else {
        localStorage.clear();
      }
    }),
    map((res) => !res.success)
  );
};
