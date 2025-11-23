import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario={
    user: '',
    password:''
  };

  adminUser={
    user: 'admin123',
    password:'admin123'
  };

  router=inject(Router)

  validateLogin(usuario:string,password:string):boolean{
    return usuario==this.adminUser.user && password==this.adminUser.password;
  }
  login(){
    if(this.validateLogin(this.usuario.user, this.usuario.password)){
      localStorage.setItem('loggedInUser',JSON.stringify(this.usuario.user));
      this.router.navigate(['/empresa']);
    }else{
      alert('Icorrecto usuario o contraseña')
    }
  }
}
