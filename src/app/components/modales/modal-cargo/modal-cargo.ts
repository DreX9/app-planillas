import { Component , inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-cargo',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-cargo.html',
  styleUrl: './modal-cargo.css',
})
export class ModalCargo {
  cargo = {
    nombre: '',
    descripcion: '',
  };
//  Modal cerrar
dialogRef = inject(MatDialogRef<ModalCargo>);

  cerrar() {
    this.dialogRef.close();
  }
  
}
