import { Receta } from "./receta"
import { Usuario } from "./usuario"

export class Calificacionreceta {
    idCalificacionReceta: number = 0
    calificacion: number = 0
    receta: Receta = new Receta()
    usuario: Usuario = new Usuario()
}