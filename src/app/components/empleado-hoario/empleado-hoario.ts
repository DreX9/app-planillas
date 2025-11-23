import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Horario } from '../horario/horario';
import { Empleado } from '../empleado/empleado';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empleado-hoario',
  imports: [MatTabsModule,
    Horario,
    Empleado, MatIconModule],
  templateUrl: './empleado-hoario.html',
  styleUrl: './empleado-hoario.css',
})
export class EmpleadoHoario {

}
