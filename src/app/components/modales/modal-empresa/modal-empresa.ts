import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-empresa',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-empresa.html',
  styleUrl: './modal-empresa.css',
})
export class ModalEmpresa {
  empresa = {
    nombre: '',
    telefono: '',
    telefonoResp: '',
    correo: '',
    direccion: ''
  };
//  Modal cerrar
dialogRef = inject(MatDialogRef<ModalEmpresa>);

  cerrar() {
    this.dialogRef.close();
  }
  
}
