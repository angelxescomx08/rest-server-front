import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  fu() {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      arr.push([1, 2, 3]);
    }
  }
}
