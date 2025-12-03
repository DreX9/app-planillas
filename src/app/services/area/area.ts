import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AreaInterface } from './area.interface';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private http = inject(HttpClient);
  private URL = `${environment.apiURL}/area`;
  getAreasByEmpresa(empresaId: number): Observable<AreaInterface[]> {
    return this.http.get<AreaInterface[]>(`${this.URL}/empresa/${empresaId}`);
  }
  createArea(area: Partial<AreaInterface>): Observable<AreaInterface> {
    return this.http.post<AreaInterface>(this.URL, area);
  }

  updateArea(area: Partial<AreaInterface>): Observable<AreaInterface> {
    return this.http.put<AreaInterface>(this.URL, area);
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }




}
