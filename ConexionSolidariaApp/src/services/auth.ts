// auth.ts
import API from "../api/api";

const getErrorMessage = (error: any, fallback: string) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return fallback;
};

export const login = async (email: string, contrasena: string) => {
  try {
    const response = await API.post("/auth/login", {
      email,
      contrasena,
    });

    const data = response.data;

    if (data?.success === false) {
      throw new Error(data.message || "Credenciales incorrectas");
    }

    return data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error, "Error en login"));
  }
};

export const cambiarPassword = async (
  nuevaPassword: string,
  passwordActual: string
) => {
  try {
    const response = await API.post("/auth/cambiar-password", {
      nuevaPassword,
      passwordActual,
    });

    const data = response.data;

    if (data?.success === false) {
      throw new Error(data.message || "Error al cambiar contraseña");
    }

    return data;
  } catch (error: any) {
    throw new Error(
      getErrorMessage(error, "Error al cambiar contraseña")
    );
  }
};