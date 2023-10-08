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
import { map, tap, catchError } from 'rxjs';

export const PublicCanMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const token = localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
  if (!token) return true;
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  return authService.verifyToken(token).pipe(
    catchError((_, data) => data),
    tap((success) => {
      if (success) {
        router.navigateByUrl('/user');
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
    catchError((_, data) => data),
    tap((success) => {
      if (success) {
        router.navigateByUrl('/user');
      }
    }),
    map((res) => !res.success)
  );
};
