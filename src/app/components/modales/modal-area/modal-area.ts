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
  selector: 'app-modal-area',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-area.html',
  styleUrl: './modal-area.css',
})
export class ModalArea {
  area = {
    nombre: '',
    estado: '',
    fecha: ''
  };
//  Modal cerrar
dialogRef = inject(MatDialogRef<ModalArea>);

  cerrar() {
    this.dialogRef.close();
  }
  
}
