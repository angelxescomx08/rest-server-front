import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

@NgModule({
  declarations: [DashboardComponent, UserLayoutComponent],
  imports: [CommonModule, UsersRoutingModule, MatSidenavModule],
})
export class UsersModule {}
