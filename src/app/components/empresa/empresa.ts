import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ModalEmpresa } from '../modales/modal-empresa/modal-empresa';
import { EmpresaService } from '../../services/empresa/empresa';



@Component({
  selector: 'app-empresa',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './empresa.html',
  styleUrl: './empresa.css',
})
export class Empresa {


  busqueda = '';
  //datos de la tabla
  columns: string[] = [
    'id',
    'nombre',
    'ruc',
    'telefono',
    'telefono_respaldo',
    'correo',
    'direccion',
    'acciones',
    'verAreas'
  ];
  //recibe datos reales
  private empresaService = inject(EmpresaService);

  data = new MatTableDataSource<any>([]);
  dataOriginal: any[] = [];

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresaService.listar().subscribe({
      next: (empresas) => {
        this.data.data = empresas;
        this.dataOriginal = [...empresas];
      },
      error: (err) => console.error('Error cargando empresas', err)
    });
  }


  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.data.data = this.dataOriginal.filter(e =>
      e.nombre.toLowerCase().includes(texto) || e.ruc.toLowerCase().includes(texto)
    );
  }
  //Habrir modal
  readonly dialog = inject(MatDialog);
  // openDialog(): void {
  //   this.dialog.open(ModalEmpresa, {
  //     width: '750px',
  //     height: 'auto',     // o '600px' si quieres fijo
  //     maxWidth: '80vw',   // PARA QUE NO SE ROMPA EN PANTALLAS PEQUEÑAS
  //     disableClose: false // opcional
  //   });
  // }

  //editar
  editar(emp: any) {
  this.dialog.open(ModalEmpresa, {
    width: '750px',
    data: emp
  })
  .afterClosed()
  .subscribe(res => {
    if (res === 'refresh') {
      this.cargarEmpresas(); // Recargar tabla
    }
  });
}

//registro 
openDialog(): void {
  this.dialog.open(ModalEmpresa, {
    width: '750px',
    data: null
  })
  .afterClosed()
  .subscribe(res => {
    if (res === 'refresh') {
      this.cargarEmpresas();
    }
  });
}
  //Para ver el area
  constructor(private router: Router) { }
  verAreas() {
    // Simulación → Navegación simple
    this.router.navigate(['/area']);
  }
}
