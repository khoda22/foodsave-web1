import { Producto } from "./producto"
import { Receta } from "./receta"

export class Ingredientereceta {
    idIngredienteReceta: number = 0
    cantidadProductos: number = 0
    unidad: string = ''
    nota: string = ''
    receta: Receta = new Receta()
    producto: Producto = new Producto()
}