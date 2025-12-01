import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  URL = `${environment.apiURL}/info`;
  http = inject(HttpClient);
  getInfo(){
    return this.http.get(this.URL, 
      {responseType: 'text'}
    );
  }

}
