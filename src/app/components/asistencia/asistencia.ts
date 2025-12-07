import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ModalAsistencia } from '../modales/modal-asistencia/modal-asistencia';
import { AsistenciaView } from '../../services/asistencia/asistencia-view.interface';
import { AsistenciaService } from '../../services/asistencia/asistencia';
@Component({
  selector: 'app-asistencia',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './asistencia.html',
  styleUrl: './asistencia.css',
})
export class Asistencia {
  busqueda = '';

  // Columnas de la tabla
  columns: string[] = ['id', 'empleado', 'fecha', 'entrada', 'salida', 'estado', 'descripcion', 'acciones'];

  // MatTableDataSource
  dataAsistencia = new MatTableDataSource<AsistenciaView>([]);
  dataOriginal: AsistenciaView[] = [];

  // Inyección de servicios
  private dialog = inject(MatDialog);
  private asistenciaService = inject(AsistenciaService);

  ngOnInit(): void {
    this.cargarAsistencias();
  }

  // Cargar datos desde backend
  cargarAsistencias(): void {
    this.asistenciaService.getAll().subscribe({
      next: (data) => {
        this.dataOriginal = data;
        this.dataAsistencia.data = data;
      },
      error: (err) => console.error('Error al cargar asistencias', err),
    });
  }

  // Filtrar por nombre de empleado
  filtrar(): void {
    const texto = this.busqueda.trim().toLowerCase();
    this.dataAsistencia.data = this.dataOriginal.filter(e =>
      e.empleado_nombre.toLowerCase().includes(texto)
    );
  }

  // Abrir modal de registro o edición
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAsistencia, {
      width: '750px',
      height: 'auto',
      maxWidth: '80vw',
      disableClose: false,
    });

    // Cuando se cierra el modal, recargar la tabla
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarAsistencias();
      }
    });
  }

  eliminarAsistencia(id: number): void {
    if (!confirm('¿Está seguro de eliminar esta asistencia?')) return;

    this.asistenciaService.eliminar(id).subscribe({
      next: () => {
        alert('Asistencia eliminada');
        this.cargarAsistencias(); // recargar tabla
      },
      error: (err) => {
        console.error('Error al eliminar asistencia', err);
        alert('No se pudo eliminar la asistencia');
      }
    });
  }


}
