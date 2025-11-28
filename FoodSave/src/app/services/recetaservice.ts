import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Receta } from '../models/receta';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Recetaservice {
  private url = `${base_url}/recetas`;
  //para insertar
  private listaCambio = new Subject<Receta[]>();

  constructor(private http: HttpClient) {}

  //listar
  list(){
    return this.http.get<Receta[]> (`${this.url}/listas`);
  }

  //insertar
  insert(rec: Receta) {
    return this.http.post(`${this.url}/nuevos`, rec);
  }
  setList(listaNueva: Receta[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){ //insertar paso 4
    return this.listaCambio.asObservable()
  }

  //actualizar
  listId(id: number) {
    return this.http.get<Receta>(`${this.url}/${id}`);
  }
  update(rec: Receta) {
    return this.http.put(`${this.url}/editar`, rec, { responseType: 'text' });
  }

  //eliminar
  delete(id: number){ 
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }

}
