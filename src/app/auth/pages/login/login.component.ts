import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
      .pipe(
        catchError((e: HttpErrorResponse) =>
          of({ success: false, error: e, message: e.error.message })
        )
      )
      .subscribe((res) => {
        if (!res.success) {
          this.openSnackBar(res.message);
        }
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
