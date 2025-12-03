import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EmpleadoWriteInterface } from './empleado.interface';
import { EmpleadoViewInterface } from './empleado-view.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private http = inject(HttpClient);
  private URL = `${environment.apiURL}/empleado`;
   // Obtiene todos los empleados (vista)
  list() {
    return this.http.get<EmpleadoViewInterface[]>(this.URL);
  }

  // Obtiene un empleado por ID (vista)
  find(id: number) {
    return this.http.get<EmpleadoViewInterface>(`${this.URL}/${id}`);
  }

  // Crear empleado (escritura)
  create(data: EmpleadoWriteInterface) {
    return this.http.post(this.URL, data);
  }

  // Editar empleado (escritura)
  update(data: EmpleadoWriteInterface) {
    return this.http.put(this.URL, data);
  }

  // Eliminar empleado
  delete(id: number) {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }

}
