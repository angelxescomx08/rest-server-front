import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  KEY_LOCAL_STORAGE_TOKEN,
  ResponseLogin,
} from '../../interfaces/login.interface';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public hide: boolean = true;
  public formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  login() {
    if (this.formulario.invalid) {
      return;
    }
    this.authService
      .login({
        email: this.formulario.value.email ?? '',
        password: this.formulario.value.password ?? '',
      })
      .pipe(
        catchError((e: HttpErrorResponse, response) => {
          if (e.name === 'HttpErrorResponse') {
            return of({
              success: false,
              message: 'Error al establecer conexión con el backend',
            } as ResponseLogin);
          }
          return response;
        })
      )
      .subscribe((res) => {
        if (res.success === false) {
          return this.toastService.openSnackBar(res.message);
        } else {
          localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, res.token);
          this.router.navigateByUrl('/dashboard/user');
        }
      });
  }
}
