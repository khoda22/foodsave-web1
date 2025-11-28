import { Producto } from "./producto"
import { Usuario } from "./usuario"

export class Inventario {
    idInventario: number = 0
    cantidadInventario: number = 0
    diasduracionInventario: number = 0
    estadoInventario: string = ''
    fechavencimientoInventario: Date = new Date()
    fechacreacionInventario: Date = new Date()
    usuario: Usuario = new Usuario()
    producto: Producto = new Producto()
}