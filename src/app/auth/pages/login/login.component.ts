import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  login() {
    if (this.formulario.invalid) {
      console.log('Debes ingresar todos los campos');
      return;
    }
    this.authService
      .login({
        email: this.formulario.value.email ?? '',
        password: this.formulario.value.password ?? '',
      })
      .subscribe((res) => console.log);
  }
}
