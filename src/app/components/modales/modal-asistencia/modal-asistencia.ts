import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-asistencia',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-asistencia.html',
  styleUrl: './modal-asistencia.css',
})
export class ModalAsistencia {
  asistencia = {
    nombre: '',
    estado: '',
    horaEntrada: '',
    horaSalida: '',
    descripcion:'',
  };
  //  Modal cerrar
  dialogRef = inject(MatDialogRef<ModalAsistencia>);

  cerrar() {
    this.dialogRef.close();
  }

}
