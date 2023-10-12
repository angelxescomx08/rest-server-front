import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  public formulario = this.fb.group({
    email: [],
    password: [],
    repeat_password: [],
    name: [],
    rol: [],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {}
}
