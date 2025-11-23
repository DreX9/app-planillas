import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-modal-horario',
  imports: [FormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDialogModule,
    MatCheckboxModule, MatRadioModule, MatSelectModule],
  templateUrl: './modal-horario.html',
  styleUrl: './modal-horario.css',
})
export class ModalHorario {
  horario = {
    turno: '',
    entrada: '',
    salida: '',
    dias: [] as string[]
  };

  
  diasSemana = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves',
    'Viernes', 'Sabado', 'Domingo'
  ];

  dialogRef = inject(MatDialogRef<ModalHorario>);

  cerrar() {
    this.dialogRef.close();
  }

  toggleDia(dia: string, checked: boolean) {
    if (checked) {
      // Agregar si no existe
      if (!this.horario.dias.includes(dia)) {
        this.horario.dias.push(dia);
      }
    } else {
      // Quitar si lo deseleccionan
      this.horario.dias = this.horario.dias.filter(d => d !== dia);
    }
  }
  check = true;


}
