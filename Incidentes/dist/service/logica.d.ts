import type { prioridad } from "../types/prioridad.js";
import type { estado } from "../types/estado.js";
import type { incidente } from "../interface/incidente.js";
export declare const incidentes: incidente[];
export declare function crearIncidente(titulo: string, descripcion: string, reportadoPor: string, prioridad: prioridad): incidente | null;
export declare function listarIncidentes(): void;
export declare function getIncidentes(): incidente[];
export declare function actualizarEstado(id: number, nuevoEstado: estado): boolean;
//# sourceMappingURL=logica.d.ts.map