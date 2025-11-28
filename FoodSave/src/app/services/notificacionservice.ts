import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Notificacionservice {
  private url = `${base_url}/notificaciones`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.url}/listas`);
  }

  autogenerar(inventarioId: number) {
    return this.http.post(`${this.url}/auto/${inventarioId}`, {}, { responseType: 'text' });
  }
}
