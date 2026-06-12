import API from "../api/api";

// Interfaz para los datos base del usuario
export interface RegistroData {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  dni: string;
  genero: string;
  fechaNacimiento: string; // Formato YYYY-MM-DD
  email: string;
  telefono: string;
  direccion: string;
}

export interface VerificacionData extends RegistroData {
  token: string;
}


export const solicitarCodigo = async (data: RegistroData) => {
  try {
    const response = await API.post("/registro", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al solicitar el código" };
  }
};


export const verificarCodigo = async (data: VerificacionData) => {
  try {
    const response = await API.post("/registro", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al verificar el código" };
  }
};