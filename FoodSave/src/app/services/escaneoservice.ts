import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Escaneo } from '../models/escaneo';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Escaneoservice {
  private url = `${base_url}/escaneos`;
  //para insertar
  private listaCambio = new Subject<Escaneo[]>();

  constructor(private http: HttpClient) {}

  //listar
  list(){
    return this.http.get<Escaneo[]> (`${this.url}/listas`);
  }

  //insertar
  insert(es: Escaneo) {
    return this.http.post(`${this.url}/nuevos`, es);
  }
  setList(listaNueva: Escaneo[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){ //insertar paso 4
    return this.listaCambio.asObservable()
  }
  //Eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
