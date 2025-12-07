import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PlanillaService } from '../../services/planilla/planilla';
import { PlanillaInterface } from '../../services/planilla/planilla.interface';
@Component({
  selector: 'app-planilla',
  imports: [MatTableModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule, CommonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './planilla.html',
  styleUrl: './planilla.css',
})
export class Planilla {
  private planillaService = inject(PlanillaService);

  // ⬇⬇⬇  ESTA ES LA DIFERENCIA IMPORTANTE
  dataSource = new MatTableDataSource<PlanillaInterface>([]);

  displayedColumns = [
    'id', 'empleado', 'periodo', 'dias_trab', 'sueldo_base',
    'descuentos', 'neto', 'estado', 'acciones'
  ];

  mesSeleccionado!: number;
  anioSeleccionado!: number;
  empleadoId!: number;

  meses = [
    { num: 1, nombre: 'Enero' }, { num: 2, nombre: 'Febrero' },
    { num: 3, nombre: 'Marzo' }, { num: 4, nombre: 'Abril' },
    { num: 5, nombre: 'Mayo' }, { num: 6, nombre: 'Junio' },
    { num: 7, nombre: 'Julio' }, { num: 8, nombre: 'Agosto' },
    { num: 9, nombre: 'Septiembre' }, { num: 10, nombre: 'Octubre' },
    { num: 11, nombre: 'Noviembre' }, { num: 12, nombre: 'Diciembre' },
  ];

  anios = [2023, 2024, 2025, 2026];

  ngOnInit() { this.listar(); }

  listar() {
    this.planillaService.getAll().subscribe(data => {
      this.dataSource.data = data; // ⬅ refresca instantáneamente
    });
  }

  generar() {
    if (!this.empleadoId || !this.mesSeleccionado || !this.anioSeleccionado) {
      alert("Completa los datos");
      return;
    }

    this.planillaService
      .generar(this.empleadoId, this.mesSeleccionado, this.anioSeleccionado)
      .subscribe(() => this.listar());
  }

  generarMasivo() {
    if (!this.mesSeleccionado || !this.anioSeleccionado) {
      alert("Seleccione mes y año");
      return;
    }

    this.planillaService
      .generarMasivo(this.mesSeleccionado, this.anioSeleccionado)
      .subscribe(msg => {
        alert(msg);
        this.listar();
      });
  }

  cambiarEstado(item: PlanillaInterface, nuevoEstado: string) {
    this.planillaService
      .cambiarEstado(item.id, nuevoEstado)
      .subscribe(() => this.listar());
  }

  descargarBoleta(id: number) {
  this.planillaService.descargarBoleta(id)
    .subscribe((pdf: Blob) => {
      const url = window.URL.createObjectURL(pdf);
      window.open(url, "_blank");
    });
}

}
