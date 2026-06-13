import type { prioridad } from "../types/prioridad.js"
import type { estado } from "../types/estado.js"


export interface incidente{
    readonly id : number
    titulo : string
    descripcion : string
    reportadoPor : string
    prioridad : prioridad
    estado : estado
    fecha : Date 
}