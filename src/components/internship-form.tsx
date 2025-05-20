
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Import Spanish locale for date formatting
import { CalendarIcon, User, Briefcase } from 'lucide-react'; // Added User and Briefcase icons

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'; // Keep Input for potential future use, though not directly for company anymore
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup, // Import SelectGroup for grouping options
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Import Select components
import { useToast } from '@/hooks/use-toast';
import type { RegisteredInternship } from '@/types/internship'; // Import the shared type

// Define available careers with updated names
const careers = [
  'Ingeniería en Sistemas de Información',
  'Ingeniería Química',
  'Ingeniería Electromecánica',
  'Ingeniería Electrónica',
] as const;
type Career = typeof careers[number]; // Define Career type

// Define Student interface/type matching the one used in registrar-alumno
interface Student {
  nombre: string;
  apellido: string;
  legajo: number; // Assuming legajo is a number
  carrera: string; // Assuming carrera is a string
}
// Define Position interface/type
interface Position {
    id: string;
    nombre: string;
    carreraIndicada: Career; // Use the Career type
    empresa: string;
}

// Define sample position data
const samplePositions: Position[] = [
    { id: 'pos1', nombre: 'Desarrollador Frontend Jr.', carreraIndicada: careers[0], empresa: 'Tech Solutions S.A.' },
    { id: 'pos2', nombre: 'Analista de Procesos Químicos', carreraIndicada: careers[1], empresa: 'Química Industrial SRL' },
    { id: 'pos3', nombre: 'Técnico de Mantenimiento', carreraIndicada: careers[2], empresa: 'Metalúrgica Central' },
    { id: 'pos4', nombre: 'Pasante de Diseño Electrónico', carreraIndicada: careers[3], empresa: 'Innovatech Electronics' },
    { id: 'pos5', nombre: 'Desarrollador Backend Jr.', carreraIndicada: careers[0], empresa: 'Global Software Inc.' },
    { id: 'pos6', nombre: 'Ingeniero de Planta', carreraIndicada: careers[1], empresa: 'Petroquímica del Sur' },
];


// Define the schema for the form using Zod
const formSchema = z.object({
  nombreEstudiante: z.string({
    required_error: 'Debes seleccionar un estudiante.',
  }),
  // Replace empresa with puestoId
  puestoId: z.string({
    required_error: 'Debes seleccionar un puesto.',
  }),
  fechaInicio: z.date({
    required_error: 'La fecha de inicio es obligatoria.',
  }),
  fechaFin: z.date({
    required_error: 'La fecha de fin es obligatoria.',
  }),
  descripcion: z.string().optional(), // Keep description optional
}).refine(data => data.fechaFin >= data.fechaInicio, {
    message: "La fecha de fin no puede ser anterior a la fecha de inicio.",
    path: ["fechaFin"], // Point the error to the end date field
}).refine(data => {
    if (!data.fechaInicio || !data.fechaFin) {
        return true;
    }
    const diffTime = Math.abs(data.fechaFin.getTime() - data.fechaInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 7;
},{
    message: "La duración de la pasantía debe ser de al menos 7 días.",
    path: ["fechaFin"], // Point the error to the end date field
}).refine(data => data.fechaFin >= data.fechaInicio, {
    message: "La fecha de fin no puede ser anterior a la fecha de inicio.",
    path: ["fechaFin"], // Point the error to the end date field
});


export type InternshipFormValues = z.infer<typeof formSchema>;

// Default values for the form
const defaultValues: Partial<InternshipFormValues> = {
    nombreEstudiante: undefined,
    puestoId: undefined, // Default puestoId to undefined
    fechaInicio: undefined,
    fechaFin: undefined,
    descripcion: '',
};

const LOCAL_STORAGE_KEY = 'registeredInternships';

export function InternshipForm() {
  const { toast } = useToast(); // Initialize useToast
  const [students, setStudents] = React.useState<Student[]>([]); // State to hold students from localStorage

  // Load students from localStorage on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedStudents = localStorage.getItem('students');
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
      }
    }
  }, []);
  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: InternshipFormValues) {
    const selectedStudent = students.find(s => `${s.nombre} ${s.apellido}` === data.nombreEstudiante); // Find student from the loaded students
    const selectedPosition = samplePositions.find(p => p.id === data.puestoId); // Find selected position

    if (!selectedStudent || !selectedPosition) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Estudiante o puesto no encontrado. Por favor, inténtalo de nuevo.",
      });
      return;
    }

    // Prepare submitted data including full student and position details
    const newInternship: RegisteredInternship = {
        id: Date.now().toString(), // Simple unique ID
        estudiante: selectedStudent, // Include full student details
        puesto: selectedPosition,    // Include full position details
        fechaInicio: data.fechaInicio.toISOString(), // Store as ISO string
        fechaFin: data.fechaFin.toISOString(), // Store as ISO string
        descripcion: data.descripcion || '', // Ensure description is always a string
    };

    try {
      // Retrieve existing internships from localStorage
      const existingInternshipsString = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existingInternships: RegisteredInternship[] = existingInternshipsString
        ? JSON.parse(existingInternshipsString)
        : [];

      // Add the new internship and save back to localStorage
      const updatedInternships = [...existingInternships, newInternship];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedInternships));

      console.log('Form Submitted and Saved:', newInternship);
      toast({
        title: 'Pasantía Registrada Localmente',
        description: `La pasantía para ${newInternship.estudiante.nombre} ${newInternship.estudiante.apellido} ha sido guardada.`,
      });
       // Reset form after successful submission
      form.reset(defaultValues);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      toast({
        variant: "destructive",
        title: 'Error al Guardar',
        description: 'No se pudo guardar la pasantía en el almacenamiento local.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Student Selection Dropdown */}
        <FormField
          control={form.control}
          name="nombreEstudiante"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estudiante</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estudiante" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                   {students.length > 0 ? (
                    students.map((student) => (
                      // Using legajo as key as it's expected to be unique
                      <SelectItem key={student.legajo} value={`${student.nombre} ${student.apellido}`}>
                        <div className="flex items-center gap-2">
                           <User className="h-4 w-4 text-muted-foreground" />
                           <span>{`${student.nombre} ${student.apellido}`} ({student.carrera})</span>
                        </div>
                      </SelectItem>
                    ))
                   ) : (
                     <SelectItem value="no-students" disabled>No hay alumnos registrados</SelectItem>
                   )}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona el pasante de la lista.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Position Selection Dropdown */}
        <FormField
          control={form.control}
          name="puestoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puesto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un puesto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {samplePositions.map((position) => (
                    <SelectItem key={position.id} value={position.id}>
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{position.nombre}</span>
                        </div>
                        <span className="text-xs text-muted-foreground pl-6">
                          {position.empresa} - {position.carreraIndicada}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona el puesto ofrecido por la empresa.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dates */}
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
           <FormField
            control={form.control}
            name="fechaInicio"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: es }) // Use Spanish locale
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    //   Disable past dates, allow today
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0,0,0,0))
                      }
                      initialFocus
                      locale={es} // Use Spanish locale in Calendar
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Fecha de inicio de la pasantía.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                           format(field.value, 'PPP', { locale: es }) // Use Spanish locale
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                       disabled={(date) => {
                         const startDate = form.watch('fechaInicio');
                         // Disable dates before start date or before today if start date not set
                         const minDate = startDate || new Date(new Date().setHours(0,0,0,0));
                         // Ensure minDate only compares the date part
                         const minDateOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
                         return date < minDateOnly;
                       }}
                      initialFocus
                      locale={es} // Use Spanish locale in Calendar
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Fecha de finalización de la pasantía. Debe ser igual o posterior a la fecha de inicio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe brevemente las tareas o el proyecto de la pasantía..."
                  className="resize-y min-h-[100px]" // Allow vertical resize
                  {...field}
                  value={field.value ?? ''} // Ensure value is not null/undefined
                />
              </FormControl>
              <FormDescription>
                Detalles adicionales sobre la pasantía.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto btn-hover-effect shadow-md" disabled={form.formState.isSubmitting}>
         {form.formState.isSubmitting ? 'Registrando...' : 'Registrar Pasantía'}
        </Button>
      </form>
    </Form>
  );
}
