import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ModalEmpresa } from '../modales/modal-empresa/modal-empresa';



@Component({
  selector: 'app-empresa',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './empresa.html',
  styleUrl: './empresa.css',
})
export class Empresa {


  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'telefono',
    'telefonoResp',
    'correo',
    'direccion'
  ];

  data = new MatTableDataSource([
    {
      id: 1,
      nombre: 'Empresa Solar',
      telefono: '987654321',
      telefonoResp: '912345678',
      correo: 'contacto@solarempresa.com',
      direccion: 'Av. Primavera 123'
    },
    {
      id: 2,
      nombre: 'Negocios Rivera',
      telefono: '965321478',
      telefonoResp: '900112233',
      correo: 'info@rivera.pe',
      direccion: 'Jr. Comercio 456'
    }
  ]);


  dataOriginal = [...this.data.data]; // para el buscador

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.data.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }
  //Habrir modal
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    this.dialog.open(ModalEmpresa, {
      width: '750px',
      height: 'auto',     // o '600px' si quieres fijo
      maxWidth: '80vw',   // PARA QUE NO SE ROMPA EN PANTALLAS PEQUEÑAS
      disableClose: false // opcional
    });
  }
}
