import { Routes } from '@angular/router';
import { Empresa } from './components/empresa/empresa';
import { Usuario } from './components/usuario/usuario';
import { Empleado } from './components/empleado/empleado';
import { NotFound } from './erros/not-found/not-found';

export const routes: Routes = [
    {path: "", component: Empresa, title: 'Empresa | App-Empresa'},
    {path: "usuario", component: Usuario, title: 'Usuario | App-Usuario'},
    {path: "empleado", component: Empleado, title: 'Empleado | App-Empleado'},
    {path: "**", component: NotFound, title: 'Error 404'},
];
