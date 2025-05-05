
// Define available careers with updated names
const careers = [
  'Ingeniería en Sistemas de Información',
  'Ingeniería Química',
  'Ingeniería Electromecánica',
  'Ingeniería Electrónica',
] as const;
type Career = typeof careers[number];

// Define Student interface
interface Student {
  id: string;
  nombre: string;
  apellido: string;
  carrera: Career;
}

// Define Position interface
interface Position {
  id: string;
  nombre: string;
  carreraIndicada: Career;
  empresa: string;
}

// Define the structure for a registered internship saved in localStorage
export interface RegisteredInternship {
  id: string; // Unique identifier for the internship record
  estudiante: Student;
  puesto: Position;
  fechaInicio: string; // Stored as ISO string (e.g., "2024-08-15T03:00:00.000Z")
  fechaFin: string; // Stored as ISO string
  descripcion: string;
}
