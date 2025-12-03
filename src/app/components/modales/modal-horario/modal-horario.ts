import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HorarioService } from '../../../services/horario/horario';
import { HorarioInterface } from '../../../services/horario/horario.interface';
@Component({
  selector: 'app-modal-horario',
  imports: [FormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDialogModule,
    MatCheckboxModule, MatRadioModule, MatSelectModule],
  templateUrl: './modal-horario.html',
  styleUrl: './modal-horario.css',
})
export class ModalHorario {
  private horarioService = inject(HorarioService);

  form: any = {
    id: null,
    hora_entrada: '',
    hora_salida: '',
    dias: '',        // "Lunes a Viernes"
    turnos: ''       // "Mañana"
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HorarioInterface | null,
    private dialogRef: MatDialogRef<ModalHorario>
  ) {
    if (data) {
      this.form = {
        id: data.id,
        hora_entrada: data.hora_entrada,
        hora_salida: data.hora_salida,
        dias: data.dias,
        turnos: data.turnos
      };
    }
  }

  guardar() {
    if (this.form.id) {
      this.horarioService.update(this.form).subscribe(() => {
        this.dialogRef.close('refresh');
      });
    } else {
      this.horarioService.create(this.form).subscribe(() => {
        this.dialogRef.close('refresh');
      });
    }
  }


  cerrar() {
    this.dialogRef.close();
  }
}
