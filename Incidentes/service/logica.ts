import type { prioridad } from "../types/prioridad.js";
import type { estado } from "../types/estado.js";
import type { incidente } from "../interface/incidente.js";

let nuevoID = 0
export const incidentes: incidente[] = []


function numeros(valor: string): boolean {
    if (valor.includes("0")) return true
    if (valor.includes("1")) return true
    if (valor.includes("2")) return true
    if (valor.includes("3")) return true
    if (valor.includes("4")) return true
    if (valor.includes("5")) return true
    if (valor.includes("6")) return true
    if (valor.includes("7")) return true
    if (valor.includes("8")) return true
    if (valor.includes("9")) return true
    return false
}

function caracteres(valor: string): boolean {
    const caracteresInvalidos = ["+", "*", "/", "\\", "|", "@", "#", "$", "%", "&", "=", "?", "¡", "¿", "<", ">", "[", "]", "{", "}", "(", ")", ";", ":", "'", "\"", "`", "~", "-"]
    
    for (let i = 0; i < valor.length; i++) {
        for (let j = 0; j < caracteresInvalidos.length; j++) {
            if (valor[i] === caracteresInvalidos[j]) {
                return true
            }
        }
    }
    return false
}


export function crearIncidente(titulo: string, descripcion: string, reportadoPor: string, prioridad: prioridad): incidente | null {
    if (titulo.trim() === "" || descripcion.trim() === "" || reportadoPor.trim() === "") {
        console.log("Error: Todos los campos son obligatorios")
        return null
    }
    
    if (numeros(titulo) || numeros(descripcion) || numeros(reportadoPor)) {
        console.log("Error: Los campos no pueden contener números")
        return null
    }
    
    if (prioridad !== "Baja" && prioridad !== "Media" && prioridad !== "Alta") {
        console.log("Error: La prioridad debe ser Baja, Media o Alta")
        return null
    }

    
    if (caracteres(titulo) || caracteres(descripcion) || caracteres(reportadoPor)) {
        console.log("Error: Los campos no pueden contener símbolos especiales (+, *, /, @, #, etc.)")
        return null
    }
    
    nuevoID++
    const nuevoIncidente: incidente = {
        id: nuevoID,
        titulo,
        descripcion,
        reportadoPor,
        prioridad,
        estado: "abierto",
        fecha: new Date()
    }
    incidentes.push(nuevoIncidente)
    return nuevoIncidente
}


export function listarIncidentes(): void {
    console.log("\n****** LISTA DE INCIDENTES ******")
    if (incidentes.length === 0) {
        console.log("No hay incidentes registrados")
    } else {
        for (let i = 0; i < incidentes.length; i++) {
            const inci = incidentes[i]
            if (inci) {
                console.log(`\n***** Incidente ${i + 1} *****`)
                console.log(`ID: ${inci.id}`)
                console.log(`Título: ${inci.titulo}`)
                console.log(`Descripción: ${inci.descripcion}`)
                console.log(`Reportado por: ${inci.reportadoPor}`)
                console.log(`Prioridad: ${inci.prioridad}`)
                console.log(`Estado: ${inci.estado}`)
                console.log(`Fecha: ${inci.fecha}`)
            }
        }
    }
    console.log("***********************************************\n")
}


export function getIncidentes(): incidente[] {
    return incidentes
}


export function actualizarEstado(id: number, nuevoEstado: estado): boolean {
    for (let i = 0; i < incidentes.length; i++) {
        if (incidentes[i]!.id === id) {
            const estadoActual = incidentes[i]!.estado
            
            if (estadoActual === "abierto" && nuevoEstado === "progreso") {
                incidentes[i]!.estado = nuevoEstado
                console.log(`\n Incidente ID ${id} actualizado: '${estadoActual}' → '${nuevoEstado}'`)
                return true
            } else if (estadoActual === "progreso" && nuevoEstado === "resuelto") {
                incidentes[i]!.estado = nuevoEstado
                console.log(`\n Incidente ID ${id} actualizado: '${estadoActual}' → '${nuevoEstado}'`)
                return true
            } else if (estadoActual === "abierto" && nuevoEstado === "resuelto") {
                console.log("Error: No se puede pasar de 'abierto' a 'resuelto' directamente. Primero debe estar 'progreso'")
                return false
            } else if (estadoActual === nuevoEstado) {
                console.log(`El incidente se actualizo correctamente '${nuevoEstado}'`)
                return false
            } else {
                console.log(`Error: No se puede pasar de '${estadoActual}' a '${nuevoEstado}'`)
                return false
            }
        }
    }
    
    console.log(`Error: No se encontró un incidente con ID ${id}`)
    return false
}