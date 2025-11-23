import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-planilla',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule,CommonModule, MatDatepickerModule, MatNativeDateModule ],
  templateUrl: './planilla.html',
  styleUrl: './planilla.css',
})
export class Planilla {
  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'cargo',
    'periodo',
    'dias',
    'sueldo',
    'estado',
    'acciones'
  ];

  dataPlanilla = new MatTableDataSource([
    {
      id: 1,
      nombre: 'Juan Pérez',
      cargo: 'Administrador de Sistemas',
      periodo: 'Noviembre 2025',
      dias: 26,
      sueldo: 3200.00,
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'María López',
      cargo: 'Asistente de Recursos Humanos',
      periodo: 'Noviembre 2025',
      dias: 24,
      sueldo: 2400.00,
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Carlos Ramos',
      cargo: 'Vendedor Senior',
      periodo: 'Noviembre 2025',
      dias: 22,
      sueldo: 2800.00,
      estado: 'Activo'
    },
    {
      id: 4,
      nombre: 'Ana Castillo',
      cargo: 'Contadora General',
      periodo: 'Noviembre 2025',
      dias: 25,
      sueldo: 3500.00,
      estado: 'Inactivo'
    },
    {
      id: 5,
      nombre: 'Luis Fernández',
      cargo: 'Operario de Almacén',
      periodo: 'Noviembre 2025',
      dias: 20,
      sueldo: 1800.00,
      estado: 'Activo'
    }
  ]);


  dataOriginal = [...this.dataPlanilla.data]; // para el buscador

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.dataPlanilla.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }
  
}
