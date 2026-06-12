// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Definimos la interfaz del contexto
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creamos el Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe ser usado dentro de un AuthProvider");
  }
  return context;
};