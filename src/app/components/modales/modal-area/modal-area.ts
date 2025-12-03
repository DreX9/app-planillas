import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AreaInterface } from '../../../services/area/area.interface';
import { AreaService } from '../../../services/area/area';

@Component({
  selector: 'app-modal-area',
  imports: [FormsModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-area.html',
  styleUrl: './modal-area.css',
})
export class ModalArea {
  // Datos del área
  area: Partial<AreaInterface> = {
    nombre: '',
    estado: 'Activo',
  };

  dialogRef = inject(MatDialogRef<ModalArea>);
  private areaService = inject(AreaService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: AreaInterface | null) {
    // Si se recibe data, es edición
    if (data) {
      this.area = { ...data };
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
  guardar() {
    if (!this.area.nombre || this.area.nombre.trim() === '') {
      console.warn('El nombre del área es obligatorio');
      return;
    }

    // Construimos payload exactamente igual que en Postman
    const payload: Partial<AreaInterface> = {
      id: this.area.id,                 // Muy importante para edición
      nombre: this.area.nombre,
      estado: this.area.estado,
      empresaId: this.area.empresaId ?? this.data?.empresaId
    };

    if (payload.id) {
      this.areaService.updateArea(payload).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: (err) => console.error('Error editando área', err)
      });
    } else {
      this.areaService.createArea(payload).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: (err) => console.error('Error creando área', err)
      });
    }
  }


}
