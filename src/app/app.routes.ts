import { Routes } from '@angular/router';
import { Empresa } from './components/empresa/empresa';
import { Usuario } from './components/usuario/usuario';
import { Empleado } from './components/empleado/empleado';
import { NotFound } from './erros/not-found/not-found';
import { Area } from './components/area/area';
import { Cargo } from './components/cargo/cargo';
import { EmpleadoHoario } from './components/empleado-hoario/empleado-hoario';
import { Horario } from './components/horario/horario';
import { Asistencia } from './components/asistencia/asistencia';
import { Planilla } from './components/planilla/planilla';
import { AsistenciaPlanilla } from './components/asistencia-planilla/asistencia-planilla';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './components/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {path: "", component: Login, title: 'Login | App-Login'},
    {
    path: "",
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {path: "empresa", component: Empresa, title: 'Empresa | App-Empresa'},
      {path: "usuario", component: Usuario, title: 'Usuario | App-Usuario'},
      {path: "empleado", component: Empleado, title: 'Empleado | App-Empleado'},
      {path: "area/:empresaId", component: Area, title: 'Area | App-Area'},
      {path: "cargo", component: Cargo, title: 'Cargo | App-Cargo'},
      {path: "horario", component: Horario, title: 'Horario | App-Horario'},
      {path: "asistencia", component: Asistencia, title: 'Asistencia | App-Asistencia'},
      {path: "planilla", component: Planilla, title: 'Planilla | App-Planilla'},
      {path: "empleado-horario", component: EmpleadoHoario, title: 'Empleado-Horario | App-Empleado-Horario'},
      {path: "asistencia-planilla", component: AsistenciaPlanilla, title: 'Asistencia-Planilla | App-Asistencia-Planilla'},
    ]
  },

  // Sin layout
  { path: "**", component: NotFound, title: 'Error 404' }
];
