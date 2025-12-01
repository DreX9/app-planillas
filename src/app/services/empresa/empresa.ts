import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private http = inject(HttpClient);
  private URL = `${environment.apiURL}/empresa`;

 
  listar() {
    return this.http.get<any[]>(this.URL);
  }

  crear(data: any) {
    return this.http.post(this.URL, data);
  }

  actualizar(data: any) {
    return this.http.put(this.URL, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  obtenerPorId(id: number) {
    return this.http.get(`${this.URL}/${id}`);
  }
}
