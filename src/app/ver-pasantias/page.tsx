
'use client'; // Add 'use client' for client-side interactions

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Briefcase, CalendarDays, User, BookOpen } from "lucide-react";
import type { RegisteredInternship } from '@/types/internship'; // Import the shared type
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const LOCAL_STORAGE_KEY = 'registeredInternships';

export default function VerPasantiasPage() {
  const [internships, setInternships] = useState<RegisteredInternship[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Load internships from localStorage on component mount
    try {
        const storedInternships = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedInternships) {
            setInternships(JSON.parse(storedInternships));
        }
    } catch (error) {
        console.error("Error loading internships from localStorage:", error);
        // Handle potential JSON parsing errors or localStorage access issues
    } finally {
        setIsLoading(false); // Set loading to false after attempting to load
    }
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-background">
      <Card className="w-full max-w-4xl shadow-lg">
         <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">
              Ver Pasantías Registradas
            </CardTitle>
            <Link href="/" passHref legacyBehavior>
              <Button variant="outline" size="icon" aria-label="Volver a inicio">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
           <CardDescription>
            Lista de todas las pasantías guardadas localmente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="mt-6 h-96 flex items-center justify-center border border-dashed rounded-md bg-muted/50">
                <p className="text-muted-foreground">Cargando pasantías...</p>
             </div>
          ) : internships.length === 0 ? (
             <div className="mt-6 h-96 flex items-center justify-center border border-dashed rounded-md bg-muted/50">
                <p className="text-muted-foreground">No hay pasantías registradas aún.</p>
             </div>
          ) : (
            <ScrollArea className="h-[60vh] mt-4 pr-4"> {/* Added ScrollArea */}
              <div className="space-y-6">
                {internships.map((internship) => (
                  <Card key={internship.id} className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
                    <CardHeader className="bg-muted/30 p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          {internship.puesto.nombre}
                        </CardTitle>
                         <Badge variant="secondary">{internship.puesto.empresa}</Badge>
                      </div>
                      <CardDescription className="pt-1 text-xs">
                        {internship.puesto.carreraIndicada}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{`${internship.estudiante.nombre} ${internship.estudiante.apellido}`}</span>
                          <span className="text-muted-foreground">({internship.estudiante.carrera})</span>
                        </div>
                        <Separator />
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                           <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Inicio:</span>
                            <span>{format(parseISO(internship.fechaInicio), 'dd MMM yyyy', { locale: es })}</span>
                           </div>
                           <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Fin:</span>
                            <span>{format(parseISO(internship.fechaFin), 'dd MMM yyyy', { locale: es })}</span>
                           </div>
                        </div>
                        {internship.descripcion && (
                          <>
                            <Separator />
                            <div className="flex items-start gap-2 text-sm">
                              <BookOpen className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                              <p className="text-muted-foreground whitespace-pre-wrap">{internship.descripcion}</p>
                            </div>
                           </>
                        )}

                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
