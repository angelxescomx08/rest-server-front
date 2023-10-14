import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ROL, ResponseCreateUser, User } from '../../interfaces/user.interface';
import { ToastService } from '../../../shared/services/toast.service';
import { UserService } from '../../services/user.service';
import {
  Prettify,
  valuesOf,
} from 'src/app/shared/interfaces/shared.interfaces';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  public opciones_roles = ['Selecciona un rol', ...Object.values(ROL)] as const;

  public formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    repeat_password: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    rol: [this.opciones_roles[0], [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  validateData() {
    if (
      this.formulario.value.password !== this.formulario.value.repeat_password
    ) {
      this.toastService.openSnackBar('Las contraseñas no coinciden');
      return false;
    }
    if (
      this.formulario.invalid &&
      this.formulario.value.rol !== 'Selecciona un rol'
    ) {
      this.toastService.openSnackBar('Datos no válidos');
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.validateData()) {
      return;
    }
    const user: Prettify<Omit<User, 'state' | 'google' | 'img'>> = {
      email: this.formulario.value.email!,
      password: this.formulario.value.password!,
      name: this.formulario.value.name!,
      rol: this.formulario.value.rol! as valuesOf<typeof ROL>,
    };
    this.userService
      .createUser(user)
      .pipe(
        catchError((error: HttpErrorResponse, data) => {
          if (error.name === 'HttpErrorResponse') {
            return of({
              success: false,
              errors: 'No se ha podido conectar al backend',
            } as ResponseCreateUser);
          }
          return data;
        })
      )
      .subscribe((res) => {
        if (res.success === false && typeof res.errors === 'string') {
          return this.toastService.openSnackBar(res.errors);
        }
        if (res.success === false) {
          return this.toastService.openSnackBar(
            'Ha ocurrido un error al crear el usuario'
          );
        }
        this.toastService.openSnackBar('Usuario creado con éxito');
        console.log({ user: res.user });
      });
  }
}
