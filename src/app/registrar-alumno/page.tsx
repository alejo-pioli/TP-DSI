"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger, SelectValue } from '@/components/ui/select';

interface Student {
  nombre: string;
  apellido: string;
  legajo: number;
  cuil: string;
  fechaNacimiento: string;
  carrera: string;
  telefono: string;
  email: string;
  domicilio: string;
}

export default function RegistrarAlumnoPage() {
  const [formData, setFormData] = useState<Student>({
    nombre: '',
    apellido: '',
    legajo: 0,
    cuil: '',
    fechaNacimiento: '',
    carrera: '',
    telefono: '',
    email: '',
    domicilio: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
 setFormData({ ...formData, [id]: id === 'legajo' ? parseInt(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push(formData);
    localStorage.setItem('students', JSON.stringify(students));
    alert('Alumno registrado exitosamente!');
    setFormData({ // Clear form after submission
      nombre: '',
      apellido: '',
      legajo: 0,
      cuil: '',
      fechaNacimiento: '',
      carrera: '',
      telefono: '',
      email: '',
      domicilio: '',
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
 <CardTitle className="text-2xl font-bold text-primary">
 Registrar Alumno
 </CardTitle>
 <Link href="/" passHref legacyBehavior>
 <Button variant="outline" size="icon" aria-label="Volver a inicio">
 <ArrowLeft className="h-4 w-4" />
 </Button>
          </Link>
 </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Nombre del alumno" value={formData.nombre} onChange={handleInputChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" placeholder="Apellido del alumno" value={formData.apellido} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="legajo">Legajo</Label>
            <Input id="legajo" placeholder="Número de legajo" type="number" value={formData.legajo === 0 ? '' : formData.legajo} onChange={handleInputChange} required />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="cuil">CUIL</Label>
            <Input id="cuil" placeholder="Número de CUIL" value={formData.cuil} onChange={handleInputChange} required />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
            {/* Considerar usar un date picker si hay un componente UI disponible */}
            <Input id="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleInputChange} required />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="carrera">Carrera</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, carrera: value })} value={formData.carrera} required>
 <SelectTrigger id="carrera">
 <SelectValue placeholder="Selecciona una carrera" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Ingeniería en Sistemas">Ingeniería en Sistemas</SelectItem>
 <SelectItem value="Ingeniería Química">Ingeniería Química</SelectItem>
 <SelectItem value="Ingeniería Electrónica">Ingeniería Electrónica</SelectItem>
 <SelectItem value="Ingeniería Electromecánica">Ingeniería Electromecánica</SelectItem>
 <SelectItem value="Ingeniería Industrial">Ingeniería Industrial</SelectItem>
 </SelectContent>
            </Select>

          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="telefono">Número de Teléfono</Label>
            <Input id="telefono" type="tel" placeholder="Número de teléfono" value={formData.telefono} onChange={handleInputChange} required />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email del alumno" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="domicilio">Domicilio</Label>
            <Input id="domicilio" placeholder="Domicilio del alumno" value={formData.domicilio} onChange={handleInputChange} required />
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">
              Registrar Alumno
            </Button>
          </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}