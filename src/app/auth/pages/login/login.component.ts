import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { KEY_LOCAL_STORAGE_TOKEN } from '../../interfaces/login.interface';

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
    private _snackBar: MatSnackBar
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
      .pipe(catchError((e: HttpErrorResponse, response) => response))
      .subscribe((res) => {
        if (res.success === false) {
          return this.openSnackBar(res.message);
        } else {
          localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, res.token);
          this.router.navigateByUrl('/user');
        }
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
