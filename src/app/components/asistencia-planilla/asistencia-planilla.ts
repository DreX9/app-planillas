import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Asistencia } from '../asistencia/asistencia';
import { Planilla } from '../planilla/planilla';

@Component({
  selector: 'app-asistencia-planilla',
  imports: [Asistencia, Planilla, MatTabsModule, MatIconModule],
  templateUrl: './asistencia-planilla.html',
  styleUrl: './asistencia-planilla.css',
})
export class AsistenciaPlanilla {

}
