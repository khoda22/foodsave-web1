import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${base_url}/usuario`;
  //para insertar
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  //listar
  list(){
    return this.http.get<Usuario[]> (`${this.url}/lista`);
  }

  //insertar
  insert(dto: any) {
    return this.http.post(`${this.url}/registrar`, dto, { responseType: 'text' });
  }
  setList(listaNueva: Usuario[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  
  //actualizar
  listId(id: number) {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  update(us: Usuario) {
    return this.http.put(`${this.url}/actualizar`, us, { responseType: 'text' });
  }

  //eliminar
  delete(id: number){ 
    return this.http.delete(`${this.url}/borrar/${id}`)
  }

}
