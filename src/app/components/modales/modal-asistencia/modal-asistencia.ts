import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AsistenciaWrite } from '../../../services/asistencia/asistencia-write.interface';
import { EmpleadoService } from '../../../services/empleado/empleado';
import { AsistenciaService } from '../../../services/asistencia/asistencia';
import { EmpleadoViewInterface } from '../../../services/empleado/empleado-view.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-asistencia',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, CommonModule],
  templateUrl: './modal-asistencia.html',
  styleUrl: './modal-asistencia.css',
})
export class ModalAsistencia {
  private empleadoService = inject(EmpleadoService);
  private asistenciaService = inject(AsistenciaService);
  empleadoBusqueda = '';
  resultadosEmpleado: EmpleadoViewInterface[] = [];
  empleadoSeleccionado: EmpleadoViewInterface | null = null;
  estado: 'Puntual' | 'Tarde' | 'Justificado' = 'Puntual';
  descripcion = '';

  private cdr = inject(ChangeDetectorRef);

  buscarEmpleado() {
    this.empleadoService.buscar(this.empleadoBusqueda).subscribe(res => {
      this.resultadosEmpleado = res;
      if (res.length === 1) this.empleadoSeleccionado = res[0];
      this.cdr.detectChanges(); // fuerza actualización inmediata del DOM
    });
  }


  guardarAsistencia() {
    if (!this.empleadoSeleccionado) return alert('Seleccione un empleado');
    const registro: AsistenciaWrite = {
      empleadoId: this.empleadoSeleccionado.id,
      estado: this.estado,
      descripcion: this.descripcion,
    };
    this.asistenciaService.registrar(registro).subscribe(() => {
      alert('Asistencia registrada');
      this.dialogRef.close('reload'); // para recargar tabla en componente principal
    });
  }
  //  Modal cerrar
  dialogRef = inject(MatDialogRef<ModalAsistencia>);

  cerrar() {
    this.dialogRef.close();
  }

}
