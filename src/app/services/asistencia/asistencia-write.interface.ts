export interface AsistenciaWrite {
    empleadoId: number;
    descripcion: string;
    estado: 'Puntual' | 'Tarde' | 'Justificado';

}
