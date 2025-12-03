import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ModalArea } from '../modales/modal-area/modal-area';

import { ActivatedRoute, Router } from '@angular/router';
import { AreaInterface } from '../../services/area/area.interface';
import { AreaService } from '../../services/area/area';
@Component({
  selector: 'app-area',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './area.html',
  styleUrl: './area.css',
})
export class Area {
  empresaId!: number;
  areas: AreaInterface[] = [];



  busqueda = '';
  dataArea = new MatTableDataSource<AreaInterface>([]);
  dataOriginal: AreaInterface[] = [];
  columns: string[] = ['id', 'nombre', 'estado', 'fecha_creacion', 'nombre_empresa', 'acciones'];

  private route = inject(ActivatedRoute);
  private areaService = inject(AreaService);

  ngOnInit() {
    this.empresaId = Number(this.route.snapshot.paramMap.get('empresaId'));
    this.cargarAreas();
  }

  cargarAreas() {
    this.areaService.getAreasByEmpresa(this.empresaId).subscribe({
      next: (resp) => {
        this.areas = resp;
        this.dataOriginal = resp;       // Para filtrar
        this.dataArea.data = resp;      // Esto llena la tabla
      },
      error: (err) => console.error('Error cargando áreas:', err)
    });
  }


  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();
    this.dataArea.data = this.dataOriginal.filter(a =>
      a.nombre.toLowerCase().includes(texto)
    );
  }
  private dialog = inject(MatDialog);

  openDialog(area?: AreaInterface) {
    this.dialog.open(ModalArea, {
      width: '500px',
      data: area
        ? { ...area, empresaId: this.empresaId }   // aquí FIX
        : { empresaId: this.empresaId }
    }).afterClosed().subscribe(res => {
      if (res === 'refresh') this.cargarAreas();
    });
  }
  //eliminar 
  eliminarArea(id: number) {
    if (!confirm('¿Seguro que quieres eliminar esta área?')) return;

    this.areaService.deleteArea(id).subscribe({
      next: () => this.cargarAreas(),  // refresca la tabla
      error: (err) => console.error('Error eliminando área', err)
    });
  }



  router = inject(Router);
  //Boton de volver 
  volver() {
    this.router.navigate(['/empresa']);
  }
}
