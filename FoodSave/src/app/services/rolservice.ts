import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Rolservice {
  private url = `${base_url}/rol`;
  //para insertar
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) {}

  //listar
  list(){
    return this.http.get<Rol[]> (`${this.url}`);
  }

  //insertar
    insert(r: Rol) {
      return this.http.post(`${this.url}`, r);
    }
    setList(listaNueva: Rol[]){
      this.listaCambio.next(listaNueva);
    }
    getList(){ //insertar paso 4
      return this.listaCambio.asObservable()
    }
  
    //actualizar
    listId(id: number) {
      return this.http.get<Rol>(`${this.url}/${id}`);
    }
    update(r: Rol) {
      return this.http.put(`${this.url}`, r, { responseType: 'text' });
    }
  
    //eliminar
    delete(id: number){ 
      return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
    }
}
