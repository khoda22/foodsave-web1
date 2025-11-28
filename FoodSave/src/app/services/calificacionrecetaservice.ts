import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Calificacionreceta } from '../models/calificacionreceta';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Calificacionrecetaservice {
  private url = `${base_url}/calificaciones`;
  //para insertar
  private listaCambio = new Subject<Calificacionreceta[]>();

  constructor(private http: HttpClient) {}

  //listar
  list(){
    return this.http.get<Calificacionreceta[]> (`${this.url}/listas`);
  }

  //listar
  listRating(id: number){
    return this.http.get<Calificacionreceta[]> (`${this.url}/${id}/rating`);
  }

  //insertar
  insert(cal: Calificacionreceta) {
    return this.http.post(`${this.url}/nuevos`, cal);
  }
  setList(listaNueva: Calificacionreceta[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){ //insertar paso 4
    return this.listaCambio.asObservable()
  }

}
