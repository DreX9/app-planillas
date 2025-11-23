import { Component , inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ModalHorario } from '../modales/modal-horario/modal-horario';

@Component({
  selector: 'app-horario',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './horario.html',
  styleUrl: './horario.css',
})
export class Horario {
  busqueda = '';

  columns: string[] = [
    'id',
    'turno',
    'entrada',
    'salida',
    'dias',
    'acciones'
  ];

  dataHorario = new MatTableDataSource([
    {
      id: 1,
      turno: 'Mañana',
      entrada: '08:00',
      salida: '16:00',
      dias: 'Lunes - Viernes'
    },
    {
      id: 2,
      turno: 'Noche',
      entrada: '22:00',
      salida: '06:00',
      dias: 'Lunes - Sábado'
    }
  ]);

  dataOriginal = [...this.dataHorario.data];

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.dataHorario.data = this.dataOriginal.filter(h =>
      h.turno.toLowerCase().includes(texto)
    );
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(ModalHorario, {
      width: '750px',
      height: 'auto',
      maxWidth: '80vw',
      disableClose: false
    });
  }

}
