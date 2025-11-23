import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ModalEmpleado } from '../modales/modal-empleado/modal-empleado';

@Component({
  selector: 'app-empleado',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './empleado.html',
  styleUrl: './empleado.css',
})
export class Empleado {
  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'apellido',
    'cargo',
    'area',
    'horario',
    'telefono',
    'correo',
    'fecha',
    'estado',
    'tipo',
    'dni',
    'salario',
    'acciones'
  ];

  dataEmpleado = new MatTableDataSource([
    {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Ramírez',
      cargo: 'Administrador',
      area: 'Recursos Humanos',
      horario: '09:00 - 18:00',
      salario: 2500,
      telefono: '987654321',
      correo: 'carlos.ramirez@empresa.com',
      fecha: '21/11/2025',
      estado: 'Activo',
      tipo: 'Tiempo Completo',
      dni: '74589612'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'Torres',
      cargo: 'Asistente',
      area: 'Contabilidad',
      horario: '08:00 - 17:00',
      salario: 1800,
      telefono: '912345678',
      correo: 'maria.torres@empresa.com',
      fecha: '19/11/2025',
      estado: 'Inactivo',
      tipo: 'Medio Tiempo',
      dni: '70894561'
    }
  ]);


  dataOriginal = [...this.dataEmpleado.data]; // para el buscador

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.dataEmpleado.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }
  //Habrir modal
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    this.dialog.open(ModalEmpleado, {
      width: '750px',
      height: 'auto',     // o '600px' si quieres fijo
      maxWidth: '80vw',   // PARA QUE NO SE ROMPA EN PANTALLAS PEQUEÑAS
      disableClose: false // opcional
    });
  }
}
