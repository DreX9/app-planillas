import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-modal-empleado',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-empleado.html',
  styleUrl: './modal-empleado.css',
})
export class ModalEmpleado {
  empleado = {
    nombre: '',
    apellido: '',
    cargo: '',
    area: '',
    horario: '',        
    salario: 0,
    telefono: '',
    correo: '',
    fecha: '',
    estado: '',
    tipo: '',
    dni: ''
  };
  //  Modal cerrar
  dialogRef = inject(MatDialogRef<ModalEmpleado>);

  cerrar() {
    this.dialogRef.close();
  }

}
