// useAuth.ts
import { useState } from "react";
import { login as loginService, cambiarPassword as cambiarPasswordService } from "../services/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, contrasena: string) => {
    setLoading(true);
    setError(null);
    try {
      return await loginService(email, contrasena);
    } catch (err: any) {
      setError(err?.message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (nuevaPassword: string, passwordActual: string) => {
    setLoading(true);
    setError(null);
    try {
      return await cambiarPasswordService(nuevaPassword, passwordActual);
    } catch (err: any) {
      setError(err?.message || "Error al cambiar contraseña");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, changePassword, loading, error };
};