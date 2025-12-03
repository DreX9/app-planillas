import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { HorarioInterface } from './horario.interface';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
   private http = inject(HttpClient);
  private URL = `${environment.apiURL}/horario`;

  list() {
    return this.http.get<HorarioInterface[]>(this.URL);
  }

  getById(id: number) {
    return this.http.get<HorarioInterface>(`${this.URL}/${id}`);
  }

  create(body: any) {
    return this.http.post<HorarioInterface>(this.URL, body);
  }

  update(body: any) {
    return this.http.put<HorarioInterface>(this.URL, body);
  }

 delete(id: number) {
  return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
}


}
