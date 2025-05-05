
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Import Spanish locale for date formatting
import { CalendarIcon } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast'; // Import useToast

// Define the schema for the form using Zod
const formSchema = z.object({
  nombreEstudiante: z.string().min(2, {
    message: 'El nombre del estudiante debe tener al menos 2 caracteres.',
  }),
  empresa: z.string().min(2, {
    message: 'El nombre de la empresa debe tener al menos 2 caracteres.',
  }),
  fechaInicio: z.date({
    required_error: 'La fecha de inicio es obligatoria.',
  }),
  fechaFin: z.date({
    required_error: 'La fecha de fin es obligatoria.',
  }),
  tutorEmpresa: z.string().min(2, {
    message: 'El nombre del tutor de la empresa debe tener al menos 2 caracteres.',
  }),
  tutorAcademico: z.string().min(2, {
    message: 'El nombre del tutor académico debe tener al menos 2 caracteres.',
  }),
  descripcion: z.string().optional(), // Make description optional
});

export type InternshipFormValues = z.infer<typeof formSchema>;

// Default values for the form
const defaultValues: Partial<InternshipFormValues> = {};

export function InternshipForm() {
  const { toast } = useToast(); // Initialize useToast
  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: InternshipFormValues) {
    console.log('Form Submitted:', data);
    // Here you would typically send the data to your backend or Firestore
    toast({
      title: 'Pasantía Registrada',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
     // Reset form after successful submission
    form.reset(defaultValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombreEstudiante"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Estudiante</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Juan Pérez" {...field} />
              </FormControl>
              <FormDescription>
                Nombre completo del pasante.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="empresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Acme Corp" {...field} />
              </FormControl>
              <FormDescription>
                Nombre de la empresa donde se realiza la pasantía.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0,0,0,0)) // Allow selecting today
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
                         const minDate = startDate ? startDate : new Date(new Date().setHours(0,0,0,0));
                         return date < minDate;
                       }}
                      initialFocus
                      locale={es} // Use Spanish locale in Calendar
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Fecha de finalización de la pasantía.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="tutorEmpresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tutor de la Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Ana Gómez" {...field} />
              </FormControl>
              <FormDescription>
                Persona de contacto en la empresa.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tutorAcademico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tutor Académico</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Prof. Luis Méndez" {...field} />
              </FormControl>
              <FormDescription>
                Profesor responsable de la pasantía.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
