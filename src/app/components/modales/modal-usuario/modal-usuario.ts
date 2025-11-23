import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-usuario',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-usuario.html',
  styleUrl: './modal-usuario.css',
})
export class ModalUsuario {
  usuario = {
    usuario: '',
    contrasena: ''
  };
//  Modal cerrar
dialogRef = inject(MatDialogRef<ModalUsuario>);

  cerrar() {
    this.dialogRef.close();
  }
  hide = true;
}
