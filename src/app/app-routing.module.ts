import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PublicCanActivate,
  PublicCanMatch,
} from './auth/guards/public-guards.guard';
import { privateCanActivate } from './auth/guards/private-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [PublicCanActivate],
    canMatch: [PublicCanMatch],
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        canActivate: [privateCanActivate],
        canMatch: [privateCanActivate],
      },
      {
        path: '**',
        redirectTo: '/dashboard/user',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
