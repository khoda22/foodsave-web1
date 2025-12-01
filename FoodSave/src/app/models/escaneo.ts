import { Producto } from "./producto"
import { Usuario } from "./usuario"

export class Escaneo {
    idEscaneo: number = 0;
    fechaEscaneo: Date = new Date();
    origen: string = '';
    usuario: Usuario = new Usuario();
    producto: Producto = new Producto();
}