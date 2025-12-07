import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AsistenciaView } from './asistencia-view.interface';
import { Observable } from 'rxjs';
import { AsistenciaWrite } from './asistencia-write.interface';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private http = inject(HttpClient);
  private URL = `${environment.apiURL}/asistencia`;
  // Obtener todas las asistencias
  getAll(): Observable<AsistenciaView[]> {
    return this.http.get<AsistenciaView[]>(this.URL);
  }

  // Obtener asistencia por ID
  getById(id: number): Observable<AsistenciaView> {
    return this.http.get<AsistenciaView>(`${this.URL}/${id}`);
  }

  // Registrar asistencia
  registrar(asistencia: AsistenciaWrite): Observable<AsistenciaView> {
    return this.http.post<AsistenciaView>(`${this.URL}/registrar`, asistencia);
  }

  //delete 
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
