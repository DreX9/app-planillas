import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ModalArea } from '../modales/modal-area/modal-area';
@Component({
  selector: 'app-area',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './area.html',
  styleUrl: './area.css',
})
export class Area {
  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'estado',
    'fecha'
  ];

  dataArea = new MatTableDataSource([
    {
      id: 1,
      nombre: 'RR.HH',
      estado: 'Activo',
      fecha: '21/11/2025'
    },
    {
      id: 2,
      nombre: 'Ventas',
      estado: 'Inactivo',
      fecha: '19/11/2025'
    }
  ]);


  dataOriginal = [...this.dataArea.data]; // para el buscador

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.dataArea.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }
  //Habrir modal
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    this.dialog.open(ModalArea, {
      width: '750px',
      height: 'auto',     // o '600px' si quieres fijo
      maxWidth: '80vw',   // PARA QUE NO SE ROMPA EN PANTALLAS PEQUEÑAS
      disableClose: false // opcional
    });
  }
}
