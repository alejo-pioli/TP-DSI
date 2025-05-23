
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InternshipForm } from "@/components/internship-form"; // Import the form component

// This page component now serves as a wrapper and handles data fetching if needed later
export default function RegistrarPasantiaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-background">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">
              Registrar Pasantía
            </CardTitle>
            <Link href="/" passHref legacyBehavior>
              <Button variant="outline" size="icon" aria-label="Volver a inicio">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
           {/* The InternshipForm component will handle fetching and displaying
               student data from localStorage */}
           <InternshipForm />
        </CardContent>
      </Card>
    </main>
  );
}
