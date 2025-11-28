import { Rol } from "./rol"

export class Usuario {
    idUsuario: number = 0
    username: string = ''
    email: string = ''
    password: string = ''
    foto: string = ''
    ubicacion: string = ''
    login: Date = new Date()
    creacion: Date = new Date()
    estado: boolean = true
    rol: Rol = new Rol()
}