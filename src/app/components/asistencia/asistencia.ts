import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ModalAsistencia } from '../modales/modal-asistencia/modal-asistencia';
@Component({
  selector: 'app-asistencia',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './asistencia.html',
  styleUrl: './asistencia.css',
})
export class Asistencia {
  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'fecha',
    'entrada',
    'salida',
    'estado',
    'acciones'
  ];

  dataAsistencia = new MatTableDataSource([
    {
      id: 1,
      nombre: 'Juan Perez',
      fecha: '21/11/2025',
      entrada: '08:00',
      salida: '17:00',
      estado: 'Puntual'
    },
    {
      id: 2,
      nombre: 'Pablo Augusto',
      fecha: '19/11/2025',
      entrada: '09:00',
      salida: '18:00',
      estado: 'Falta'
    }
  ]);


  dataOriginal = [...this.dataAsistencia.data]; // para el buscador

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.dataAsistencia.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }
  //Habrir modal
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    this.dialog.open(ModalAsistencia, {
      width: '750px',
      height: 'auto',     // o '600px' si quieres fijo
      maxWidth: '80vw',   // PARA QUE NO SE ROMPA EN PANTALLAS PEQUEÑAS
      disableClose: false // opcional
    });
  }
}
