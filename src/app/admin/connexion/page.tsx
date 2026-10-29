import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Connexion · Administration",
  robots: { index: false, follow: false },
};

export default function ConnexionPage() {
  return <LoginForm />;
}
