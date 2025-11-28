import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ingredientereceta } from '../models/ingredientereceta';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Ingredienterecetaservice {
  private url = `${base_url}/ingredientes`;
  //para insertar
  private listaCambio = new Subject<Ingredientereceta[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Ingredientereceta[]>(`${this.url}/listas`);
  }

  //insertar
  insert(inv: Ingredientereceta) {
    return this.http.post(`${this.url}/nuevos`, inv);
  }
  setList(listaNueva: Ingredientereceta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    //insertar paso 4
    return this.listaCambio.asObservable();
  }

  //eliminar
  delete(id: number){ 
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }
}
