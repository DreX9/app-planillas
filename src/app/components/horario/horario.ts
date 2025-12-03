import { Component , inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ModalHorario } from '../modales/modal-horario/modal-horario';
import { HorarioInterface } from '../../services/horario/horario.interface';
import { HorarioService } from '../../services/horario/horario';

@Component({
  selector: 'app-horario',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './horario.html',
  styleUrl: './horario.css',
})
export class Horario {
  private horarioService = inject(HorarioService);
  readonly dialog = inject(MatDialog);

  busqueda = '';

  columns: string[] = [
    'id',
    'turnos',
    'hora_entrada',
    'hora_salida',
    'dias',
    'acciones'
  ];

  dataHorario = new MatTableDataSource<HorarioInterface>([]);
  dataOriginal: HorarioInterface[] = [];

  ngOnInit() {
    this.cargarHorarios();
  }

  cargarHorarios() {
    this.horarioService.list().subscribe(resp => {
      this.dataHorario.data = resp;
      this.dataOriginal = [...resp];
    });
  }

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();
    this.dataHorario.data = this.dataOriginal.filter(h =>
      h.turnos.toLowerCase().includes(texto)
    );
  }

  openDialog(horario?: HorarioInterface) {
    this.dialog.open(ModalHorario, {
      width: '750px',
      data: horario
    }).afterClosed().subscribe(res => {
      if (res === 'refresh') {
        this.cargarHorarios();
      }
    });
  }

  eliminar(id: number) {
    this.horarioService.delete(id).subscribe(() => {
      this.cargarHorarios();
    });
  }
}
