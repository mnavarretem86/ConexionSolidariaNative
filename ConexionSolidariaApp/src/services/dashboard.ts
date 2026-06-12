import API from "../api/api"; 

export const obtenerEventos = async () => {
  try {
    const response = await API.get("/dashboard/eventos");
    return response.data;
  } catch (error: any) {
    console.error("Error en obtenerEventos:", error.response?.data || error);
    return [];
  }
};

export const obtenerInscripciones = async () => {
  try {
    const response = await API.get("/dashboard/inscripciones");
    return response.data;
  } catch (error: any) {
    console.error("Error en obtenerInscripciones:", error.response?.data || error);
    return [];
  }
};  