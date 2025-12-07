export interface EmpleadoViewInterface {
     id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;

  tipo_documento: 'DNI' | 'PASAPORTE';
  numero_documento: string;

  fecha_contratacion: string;
  estado: 'ACTIVO' | 'INACTIVO';

  salario_base: number;

  nombre_rol: string;
  turno_horario: string;
  nombre_area: string;
}
