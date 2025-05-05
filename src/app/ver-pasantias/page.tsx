import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function VerPasantiasPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-background">
      <Card className="w-full max-w-4xl shadow-lg">
         <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">
              Ver Pasantías
            </CardTitle>
            <Link href="/" passHref legacyBehavior>
              <Button variant="outline" size="icon" aria-label="Volver a inicio">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aquí se mostrará la lista de pasantías registradas.
          </p>
          {/* Placeholder for the list/table */}
           <div className="mt-6 h-96 flex items-center justify-center border border-dashed rounded-md bg-muted/50">
            <p className="text-muted-foreground">Lista de pasantías próximamente...</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
