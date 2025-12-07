import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { PlanillaInterface } from './planilla.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanillaService {
  private http = inject(HttpClient);
  private URL = `${environment.apiURL}/planilla`;

  // listar todas
  getAll(): Observable<PlanillaInterface[]> {
    return this.http.get<PlanillaInterface[]>(`${this.URL}`);
  }

  // generar planilla (envía parámetros por URL)
  generar(empleadoId: number, mes: number, anio: number): Observable<PlanillaInterface> {
    return this.http.post<PlanillaInterface>(
      `${this.URL}/generar?empleadoId=${empleadoId}&mes=${mes}&anio=${anio}`,
      null
    );
  }

  // cambiar estado (envía parámetros por URL)
  cambiarEstado(id: number, estado: string): Observable<PlanillaInterface> {
    return this.http.put<PlanillaInterface>(
      `${this.URL}/${id}/estado?estado=${estado}`,
      null
    );
  }

  // planilla.service.ts
  generarMasivo(mes: number, anio: number): Observable<string> {
    return this.http.post(
      `${this.URL}/generar-masivo?mes=${mes}&anio=${anio}`,
      null,
      { responseType: 'text' }
    );
  }
  //descargar pdf
  descargarBoleta(planillaId: number): Observable<Blob> {
    return this.http.get(`${environment.apiURL}/boleta/${planillaId}/pdf`, {
      responseType: 'blob' // <-- PDF (binario)
    });
  }

}
