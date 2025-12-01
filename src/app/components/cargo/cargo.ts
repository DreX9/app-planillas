import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalCargo } from '../modales/modal-cargo/modal-cargo';
import { Observable } from 'rxjs';
import { InfoService } from '../../services/info/info';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cargo',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule, AsyncPipe],
  templateUrl: './cargo.html',
  styleUrl: './cargo.css',
})
export class Cargo implements OnInit{
  //
  info$! : Observable<string>;
  service = inject(InfoService);
  ngOnInit(): void {
    this.info$ = this.service.getInfo();
  }

  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'acciones'
  ];

    dataCargo = new MatTableDataSource([
    {
      id: 1,
      nombre: 'Gerente',
      descripcion: 'Encargado de la gestion general de la empresa',
    },
    {
      id: 2,
      nombre: 'Jefe Supervisor',
      descripcion: 'Encargado de supervisar al personal de la empresa',
    }
  ]);

  dataOriginal = [...this.dataCargo.data]; // para el buscador
  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.dataCargo.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }
  //Habrir modal
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    this.dialog.open(ModalCargo, {
      width: '750px',
      height: 'auto',     // o '600px' si quieres fijo
      maxWidth: '80vw',   // PARA QUE NO SE ROMPA EN PANTALLAS PEQUEÑAS
      disableClose: false // opcional
    });
  }

}
