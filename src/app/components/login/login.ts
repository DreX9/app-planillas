import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CredentialsInterface } from '../../shared/model/credentials-interface';
@Component({
  selector: 'app-login',
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginService = inject(AuthService);

  router = inject(Router)

  formLogin = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  inicarSesion() {
    const credenciales: CredentialsInterface = {
      usuario: this.formLogin.value.usuario!,
      password: this.formLogin.value.password!,
    }
    this.loginService.authenticate(credenciales).subscribe(resp => {
      console.log("RESPUESTA DEL BACKEND:", resp);
      this.loginService.guardarToken(resp.access_token);
      this.router.navigate(['/cargo']);
    });
  }

}
