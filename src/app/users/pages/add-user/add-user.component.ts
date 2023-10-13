import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  public roles = [
    'Selecciona un rol',
    'ADMIN_ROL',
    'USER_ROL',
    'VENTAS_ROL',
  ] as const;

  public formulario = this.fb.group({
    email: [],
    password: [],
    repeat_password: [],
    name: [],
    rol: [this.roles[0]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {}
}
