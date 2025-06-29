import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex  bg-[#F1F5F8]'>
        <ToastContainer
          position="top-right" // Position de la notification
          autoClose={6000}     // Durée d'affichage en millisecondes (3s par défaut)
          hideProgressBar={false} // Affiche la barre de progression par défaut
          newestOnTop={true}      // Les notifications les plus récentes apparaissent en haut
          closeOnClick            // Fermeture de la notification au clic
          rtl={false}             // Désactive le support RTL (Right to Left)
          pauseOnFocusLoss        // Pause la notification si la fenêtre perd le focus
          draggable               // Permet de déplacer la notification
          pauseOnHover
          theme="colored"
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
