export interface AsistenciaView {
    id: number;
    hora_inicio: string; 
    hora_final: string;  
    fecha_registro: string; 
    estado: 'Puntual' | 'Tarde' | 'Justificado';
    descripcion: string;
    empleado_nombre: string;
}
