import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { CardUserComponent } from './components/card-user/card-user/card-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DashboardComponent, UserLayoutComponent, CardUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class UsersModule {}
