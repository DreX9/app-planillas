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
    'telefono',
    'correo',
    'tipo_documento',
    'numero_documento',
    'fecha_contratacion',
    'estado',
    'salario_base',
    'nombre_rol',
    'nombre_area',
    'turno_horario',
    'acciones'
  ];

  dataEmpleado = new MatTableDataSource<EmpleadoViewInterface>([]);
  dataOriginal: EmpleadoViewInterface[] = [];

  private empleadoService = inject(EmpleadoService);

  readonly dialog = inject(MatDialog);

  constructor() {
    this.cargarEmpleados();
  }

  // CARGA REAL DESDE BACKEND
  cargarEmpleados() {
    this.empleadoService.list().subscribe({
      next: (res) => {
        this.dataEmpleado.data = res;
        this.dataOriginal = [...res];
      }
    });
  }

  // FILTRAR POR NOMBRE O APELLIDO
  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();
    this.dataEmpleado.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto) ||
      e.apellido.toLowerCase().includes(texto)
    );
  }

  // ABRIR MODAL PARA CREAR
  openDialog() {
    const dialogRef = this.dialog.open(ModalEmpleado, {
      width: '750px',
      data: null, // <-- creación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarEmpleados();
    });
  }

  // ABRIR MODAL PARA EDITAR
  editarEmpleado(emp: EmpleadoViewInterface) {
    const dialogRef = this.dialog.open(ModalEmpleado, {
      width: '750px',
      data: emp  // <-- se envía el empleado completo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarEmpleados();
    });
  }

  // ELIMINAR EMPLEADO
  eliminarEmpleado(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este empleado?")) return;

    this.empleadoService.delete(id).subscribe({
      next: () => this.cargarEmpleados(),
      error: (err) => console.error("Error al eliminar", err)
    });
  }


}
