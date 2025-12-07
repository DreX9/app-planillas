export interface PlanillaInterface {
    id: number;

    fecha_generacion: string; // LocalDate se recibe como string ISO

    mes: number;
    anio: number;

    // Datos del empleado
    empleado_nombre: string;
    empleado_apellido: string;

    // Cálculos
    sueldo_base: number;
    total_descuentos: number;
    sueldo_neto: number;

    dias_trabajados: number;

    tardanzas: number;
    inasistencias: number;

    estado_planilla: string; // enum en backend, string en frontend
}
