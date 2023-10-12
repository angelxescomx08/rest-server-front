import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, MatSidenavModule, RouterModule],
  exports: [MainLayoutComponent],
})
export class SharedModule {}
