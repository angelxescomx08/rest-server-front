import { Component } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent {
  fu() {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      arr.push([1, 2, 3]);
    }
  }
}
