import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Productoservice {
  private url = `${base_url}/producto`;
  //para insertar
  private listaCambio = new Subject<Producto[]>();

  constructor(private http: HttpClient) {}

  //listar
  list() {
    return this.http.get<Producto[]>(`${this.url}/listas`);
  }

  //insertar
  insert(prod: Producto) {
    return this.http.post(`${this.url}/nuevos`, prod);
  }
  setList(listaNueva: Producto[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    //insertar paso 4
    return this.listaCambio.asObservable();
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }
  update(prod: Producto) {
    return this.http.put(`${this.url}/editar`, prod, { responseType: 'text' });
  }

  //eliminar
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
