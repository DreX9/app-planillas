import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { EmpleadoWriteInterface } from '../../../services/empleado/empleado.interface';
import { EmpleadoService } from '../../../services/empleado/empleado';
import { AreaService } from '../../../services/area/area';
import { HorarioService } from '../../../services/horario/horario';
import { EmpresaService } from '../../../services/empresa/empresa';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-modal-empleado',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatOptionModule, CommonModule, NgForOf,
    NgIf],
  templateUrl: './modal-empleado.html',
  styleUrl: './modal-empleado.css',
})
export class ModalEmpleado {

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ModalEmpleado>);
  empleadoService = inject(EmpleadoService);
  areaService = inject(AreaService);
  horarioService = inject(HorarioService);
  empresaService = inject(EmpresaService);

  // Selects
  empresas: any[] = [];
  areas: any[] = [];
  horarios: any[] = [];
  roles = [
    { id: 1, nombre: 'ADMIN' }
  ];

  empresaId: number = 0;

  // OBJETO COMPLETO PARA REGISTRAR
  empleado: EmpleadoWriteInterface = {
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',

    tipo_documento: 'DNI',
    numero_documento: '',

    estado: 'ACTIVO',
    salario_base: 0,

    rolId: 0,
    horarioId: 0,
    areaId: 0
  };

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.cargarEmpresas();
      this.cargarHorarios();
    });
    // 👉 SI ESTOY EDITANDO, LLENAR DATOS
    if (this.data) {
      this.empleado = {
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        telefono: this.data.telefono,
        correo: this.data.correo,

        tipo_documento: this.data.tipo_documento,
        numero_documento: this.data.numero_documento,

        estado: this.data.estado,
        salario_base: this.data.salario_base,

        rolId: this.data.rol_id,
        horarioId: this.data.horario_id,
        areaId: this.data.area_id,
      };

      this.empresaId = this.data.empresa_id;

      // cargar áreas de esa empresa
      this.cargarAreasPorEmpresa();
    }
  }

  cargarEmpresas() {
    this.empresaService.listar().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.empresas = res;
        });
      }
    });
  }


  cargarAreasPorEmpresa() {
    if (!this.empresaId) return;

    this.areaService.getAreasByEmpresa(this.empresaId).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.areas = res;
        });
      }
    });
  }


  cargarHorarios() {
    this.horarioService.list().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.horarios = res;
        });
      }
    });
  }


  guardar() {
    if (this.data) {
      this.empleadoService.update({
        id: this.data.id,   
        ...this.empleado
      }).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al editar empleado', err)
      });
    } else {
      // 👉 MODO REGISTRO
      this.empleadoService.create(this.empleado).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al guardar empleado', err)
      });
    }
  }

  cerrar() {
    this.dialogRef.close(false);
  }
}
