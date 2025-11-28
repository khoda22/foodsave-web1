import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inventario } from '../models/inventario';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Inventarioservice {
  private url = `${base_url}/inventario`;
  //para insertar
  private listaCambio = new Subject<Inventario[]>();

  constructor(private http: HttpClient) {}
  
  //listar
  list(){
    return this.http.get<Inventario[]> (`${this.url}/listas`);
  }

  //insertar
  insert(inv: Inventario) {
    return this.http.post(`${this.url}/nuevos`, inv);
  }
  setList(listaNueva: Inventario[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){ //insertar paso 4
    return this.listaCambio.asObservable()
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Inventario>(`${this.url}/${id}`);
  }
  update(inv: Inventario) {
    return this.http.put(`${this.url}/editar`, inv, { responseType: 'text' });
  }

  //eliminar
  delete(id: number){ 
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }

}
