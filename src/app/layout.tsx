import type {Metadata} from 'next';
import {Geist} from 'next/font/google'; // Using Geist Sans as requested
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Remove Geist Mono if not needed, keep Geist Sans
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Pasantías Manager', // Updated title
  description: 'Manage your internships easily.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply Geist Sans variable */}
      <body className={`${geistSans.variable} antialiased font-sans`}>
        {children}
        <Toaster /> {/* Add Toaster */}
      </body>
    </html>
  );
}
