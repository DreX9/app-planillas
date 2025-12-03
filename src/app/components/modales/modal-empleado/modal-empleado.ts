import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { EmpleadoWriteInterface } from '../../../services/empleado/empleado.interface';
import { EmpleadoService } from '../../../services/empleado/empleado';
import { AreaService } from '../../../services/area/area';
import { HorarioService } from '../../../services/horario/horario';
import { EmpresaService } from '../../../services/empresa/empresa';

// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-modal-empleado',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-empleado.html',
  styleUrl: './modal-empleado.css',
})
export class ModalEmpleado {

 dialogRef = inject(MatDialogRef<ModalEmpleado>);
  empleadoService = inject(EmpleadoService);
  areaService = inject(AreaService);
  horarioService = inject(HorarioService);
  empresaService = inject(EmpresaService);   // <-- INYECTADO

  // Selects
  empresas: any[] = [];
  areas: any[] = [];
  horarios: any[] = [];

  empresaId: number = 0;

  roles = [{ id: 1, nombre: 'ADMIN' }];

  empleado: EmpleadoWriteInterface = {
    nombre: '',
    apellido: '',
    rolId: 1,
    horarioId: 0,
    areaId: 0
  };

  constructor() {
    this.cargarEmpresas();
    this.cargarHorarios();
  }

  cargarEmpresas() {
    this.empresaService.listar().subscribe({
      next: (res: any) => this.empresas = res
    });
  }

  cargarAreasPorEmpresa() {
    if (!this.empresaId) return;

    this.areaService.getAreasByEmpresa(this.empresaId).subscribe({
      next: res => this.areas = res
    });
  }

  cargarHorarios() {
    this.horarioService.list().subscribe({
      next: (res: any) => this.horarios = res,
    });
  }

  guardar() {
    this.empleadoService.create(this.empleado).subscribe({
      next: () => this.dialogRef.close(true),
    });
  }

  cerrar() {
    this.dialogRef.close(false);
  }

}
