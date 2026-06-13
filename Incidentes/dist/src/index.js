import * as readline from "readline";
import { crearIncidente, listarIncidentes, getIncidentes, actualizarEstado } from "../service/logica.js";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function CrearIncidentes() {
    rl.question("Ingrese el titulo del problema: ", (titulo) => {
        rl.question("Ingrese la descripcion del problema: ", (descrip) => {
            rl.question("Ingrese quien reporto el problema: ", (reportado) => {
                rl.question("Ingrese cual es la prioridad (Baja, Media, Alta): ", (prioridad) => {
                    const nuevo = crearIncidente(titulo, descrip, reportado, prioridad);
                    if (nuevo === null) {
                        console.log("\nNo se pudo crear el incidente\n");
                    }
                    else {
                        console.log("\n***** Incidente creado *****");
                        console.log(`ID: ${nuevo.id}`);
                        console.log(`Título: ${nuevo.titulo}`);
                        console.log(`Descripción: ${nuevo.descripcion}`);
                        console.log(`Reportado por: ${nuevo.reportadoPor}`);
                        console.log(`Prioridad: ${nuevo.prioridad}`);
                        console.log(`Estado: ${nuevo.estado}`);
                        console.log(`Fecha: ${nuevo.fecha}`);
                        console.log("************************************************\n");
                    }
                    mostrarMenu();
                });
            });
        });
    });
}
function EstadoActualizar() {
    const incidentesActual = getIncidentes();
    if (incidentesActual.length === 0) {
        console.log("\nNo hay incidentes para actualizar\n");
        mostrarMenu();
        return;
    }
    rl.question("Ingrese el ID del incidente que desea actualizar: ", (input) => {
        const id = parseInt(input);
        if (isNaN(id)) {
            console.log("\nError: Debe ingresar un número válido\n");
            mostrarMenu();
            return;
        }
        console.log("\nEstados disponibles:");
        console.log("1. progreso");
        console.log("2. resuelto");
        rl.question("Seleccione el nuevo estado: ", (ElegirEstado) => {
            let nuevoEstado;
            if (ElegirEstado === "1") {
                nuevoEstado = "progreso";
            }
            else if (ElegirEstado === "2") {
                nuevoEstado = "resuelto";
            }
            else {
                console.log("\nOpción no válida\n");
                mostrarMenu();
                return;
            }
            actualizarEstado(id, nuevoEstado);
            const incidentesDespues = getIncidentes();
            const incidenteActualizado = incidentesDespues.find(incidente => incidente.id === id);
            if (incidenteActualizado) {
                console.log(`El incidente ID ${id} ahora tiene un nuevo estado: ${incidenteActualizado.estado}`);
            }
            mostrarMenu();
        });
    });
}
function mostrarMenu() {
    console.log("\n****** SISTEMA DE INCIDENTES *******");
    console.log("1. Crear incidente");
    console.log("2. Listar incidentes");
    console.log("3. Actualizar estado de incidente");
    console.log("4. Salir");
    console.log("#********************************************");
    rl.question("Seleccione una opción: ", (opcion) => {
        if (opcion === "1") {
            CrearIncidentes();
        }
        else if (opcion === "2") {
            listarIncidentes();
            mostrarMenu();
        }
        else if (opcion === "3") {
            EstadoActualizar();
        }
        else if (opcion === "4") {
            console.log("\nAdios, feliz día");
            rl.close();
        }
        else {
            console.log("\nOpción no válida. Intente de nuevo.");
            mostrarMenu();
        }
    });
}
mostrarMenu();
//# sourceMappingURL=index.js.map