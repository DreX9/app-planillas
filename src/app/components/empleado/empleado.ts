import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ModalEmpleado } from '../modales/modal-empleado/modal-empleado';
import { EmpleadoService } from '../../services/empleado/empleado';
import { EmpleadoViewInterface } from '../../services/empleado/empleado-view.interface';

@Component({
  selector: 'app-empleado',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './empleado.html',
  styleUrl: './empleado.css',
})
export class Empleado {
 busqueda = '';

  // Columnas que se muestran en la tabla
  columns: string[] = [
     'id',
    'nombre',
    'apellido',
    'cargo',
    'area',
    'horario',
    'acciones'
  ];

  dataEmpleado = new MatTableDataSource<EmpleadoViewInterface>([]);
  dataOriginal: EmpleadoViewInterface[] = [];

  private empleadoService = inject(EmpleadoService);

  // Abrir modal
  readonly dialog = inject(MatDialog);

  constructor() {
    this.cargarEmpleados();
  }

  // CARGA REAL DESDE EL BACKEND
  cargarEmpleados() {
    this.empleadoService.list().subscribe({
      next: (res) => {
        this.dataEmpleado.data = res;
        this.dataOriginal = [...res];
      }
    });
  }

  // BUSCADOR LOCAL
  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();
    this.dataEmpleado.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto) ||
      e.apellido.toLowerCase().includes(texto)
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalEmpleado, {
      width: '750px',
      height: 'auto',
      maxWidth: '80vw'
    });

    // CUANDO EL MODAL SE CIERRA, REFRESCAMOS LA TABLA
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarEmpleados();
      }
    });
  }

}
