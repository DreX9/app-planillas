import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cargo',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './cargo.html',
  styleUrl: './cargo.css',
})
export class Cargo {
  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'descripcion ',
    'estado'
  ];

    dataCargo = new MatTableDataSource([
    {
      id: 1,
      nombre: 'Gerente',
      descripcion: 'Encargado de la gestion general de la empresa',
      estado: '21/11/2025'
    },
    {
      id: 2,
      nombre: 'Jefe Supervisor',
      descripcion: 'Encargado de supervisar al personal de la empresa',
      estado: '21/11/2025'
    }
  ]);

  dataOriginal = [...this.dataCargo.data]; // para el buscador

}
