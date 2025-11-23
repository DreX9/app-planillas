import { Routes } from '@angular/router';
import { Empresa } from './components/empresa/empresa';
import { Usuario } from './components/usuario/usuario';
import { Empleado } from './components/empleado/empleado';
import { NotFound } from './erros/not-found/not-found';
import { Area } from './components/area/area';
import { Cargo } from './components/cargo/cargo';
import { EmpleadoHoario } from './components/empleado-hoario/empleado-hoario';
import { Horario } from './components/horario/horario';

export const routes: Routes = [
    {path: "", component: Empresa, title: 'Empresa | App-Empresa'},
    {path: "usuario", component: Usuario, title: 'Usuario | App-Usuario'},
    {path: "empleado", component: Empleado, title: 'Empleado | App-Empleado'},
    {path: "area", component: Area, title: 'Area | App-Area'},
    {path: "cargo", component: Cargo, title: 'Cargo | App-Cargo'},
    {path: "horario", component: Horario, title: 'Horario | App-Horario'},
    {path: "empleado-horario", component: EmpleadoHoario},
    {path: "**", component: NotFound, title: 'Error 404'},
];
