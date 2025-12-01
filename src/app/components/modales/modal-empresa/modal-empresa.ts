import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { EmpresaService } from '../../../services/empresa/empresa';

@Component({
  selector: 'app-modal-empresa',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './modal-empresa.html',
  styleUrl: './modal-empresa.css',
})
export class ModalEmpresa {
  empresaService = inject(EmpresaService);

  empresa = {
    id: null,
    nombre: '',
    ruc: '',
    telefono: '',
    telefono_respaldo: '',
    correo: '',
    direccion: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalEmpresa>
  ) {
    if (data) {
      this.empresa = { ...data }; // Si se pasa empresa para editar
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
  guardar() {
  if (this.empresa.id) {
    // Si tiene id → actualizar
    this.empresaService.actualizar(this.empresa).subscribe({
      next: () => this.dialogRef.close('refresh'),
      error: (err) => console.error('Error actualizando empresa', err)
    });
  } else {
    // Si no tiene id → crear
    this.empresaService.crear(this.empresa).subscribe({
      next: () => this.dialogRef.close('refresh'),
      error: (err) => console.error('Error creando empresa', err)
    });
  }
}




}
