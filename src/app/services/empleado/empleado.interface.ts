export interface EmpleadoWriteInterface {
    id?: number;

  nombre: string;
  apellido: string;
  telefono?: string;
  correo?: string;

  tipo_documento: 'DNI' | 'PASAPORTE';
  numero_documento: string;

  estado: 'ACTIVO' | 'INACTIVO';
  salario_base: number;

  rolId: number;
  horarioId: number;
  areaId: number;
}
