
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Import Select components
import { useToast } from '@/hooks/use-toast';

// Define available careers with updated names
const careers = [
  'Ingeniería en Sistemas de Información',
  'Ingeniería Química',
  'Ingeniería Electromecánica',
  'Ingeniería Electrónica',
] as const;
type Career = typeof careers[number]; // Define Career type

// Define sample student data with updated career names
const sampleStudents = [
  { id: '1', nombre: 'Juan', apellido: 'Pérez', carrera: careers[0] },
  { id: '2', nombre: 'Ana', apellido: 'García', carrera: careers[1] },
  { id: '3', nombre: 'Luis', apellido: 'Martínez', carrera: careers[2] },
  { id: '4', nombre: 'María', apellido: 'Rodríguez', carrera: careers[3] },
  { id: '5', nombre: 'Carlos', apellido: 'López', carrera: careers[0] },
];

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

export function InternshipForm() {
  const { toast } = useToast(); // Initialize useToast
  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: InternshipFormValues) {
    const selectedStudent = sampleStudents.find(s => `${s.nombre} ${s.apellido}` === data.nombreEstudiante);
    const selectedPosition = samplePositions.find(p => p.id === data.puestoId); // Find selected position

    // Prepare submitted data including full student and position details
    const submittedData = {
        estudiante: selectedStudent, // Include full student details
        puesto: selectedPosition,    // Include full position details
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        descripcion: data.descripcion,
    };

    console.log('Form Submitted:', submittedData);
    // Here you would typically send the data to your backend or Firestore
    toast({
      title: 'Pasantía Registrada',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(submittedData, null, 2)}</code>
        </pre>
      ),
    });
     // Reset form after successful submission
    form.reset(defaultValues);
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
                  {sampleStudents.map((student) => (
                    <SelectItem key={student.id} value={`${student.nombre} ${student.apellido}`}>
                      <div className="flex items-center gap-2">
                         <User className="h-4 w-4 text-muted-foreground" />
                         <span>{`${student.nombre} ${student.apellido}`} ({student.carrera})</span>
                      </div>
                    </SelectItem>
                  ))}
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

