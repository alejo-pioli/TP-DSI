import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Pasantías Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pt-4">
          <Link href="/registrar-pasantia" passHref legacyBehavior>
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground btn-hover-effect shadow-md hover:bg-primary/90"
              aria-label="Registrar nueva pasantía"
            >
              Registrar Pasantía
            </Button>
          </Link>
          <Link href="/ver-pasantias" passHref legacyBehavior>
            <Button
              size="lg"
              variant="secondary"
              className="w-full btn-hover-effect shadow-md"
              aria-label="Ver lista de pasantías registradas"
            >
              Ver Pasantías
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
