import { Inventario } from "./inventario"

export class Notificacion {
    idNotificacion: number = 0
    tipo: boolean = false
    mensaje: string = ''
    fechaProgramada: Date = new Date()
    fechaCreacion: Date = new Date()
    inventario: Inventario = new Inventario()
}