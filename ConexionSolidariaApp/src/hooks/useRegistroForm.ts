import { useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { solicitarCodigo, verificarCodigo, RegistroData } from "../services/registro";

export const useRegistroForm = () => {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showGenderMenu, setShowGenderMenu] = useState(false);

  const [formData, setFormData] = useState<RegistroData>({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    dni: "",
    genero: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof RegistroData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const showError = (msg: string) => {
    Toast.show({ type: "error", text1: msg });
  };

  const showSuccess = (msg: string) => {
    Toast.show({ type: "success", text1: msg });
  };

  const validate = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.primerNombre.trim()) newErrors.primerNombre = "Requerido";
    if (!formData.primerApellido.trim()) newErrors.primerApellido = "Requerido";
    if (!formData.dni.trim() || formData.dni.trim().length < 10)
      newErrors.dni = "DNI inválido";

    if (!formData.genero) newErrors.genero = "Selecciona género";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "Selecciona fecha";

    if (!formData.email.trim() || !formData.email.includes("@")) 
      newErrors.email = "Email inválido";
    
    if (!formData.telefono.trim()) newErrors.telefono = "Requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterPress = async () => {
    Keyboard.dismiss();

    if (!validate()) {
      showError("Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      await solicitarCodigo(formData);
      showSuccess("Código enviado correctamente");
      setStep(2);
    } catch (error: any) {
      showError(error?.message || "Error al solicitar el código");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPress = async () => {
    Keyboard.dismiss();

    if (!token || token.trim().length !== 6) {
      showError("Ingresa un código válido de 6 dígitos");
      return;
    }

    setLoading(true);
    try {
      await verificarCodigo({ ...formData, token: token.trim() });
      showSuccess("Registro completado");

      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (error: any) {
      showError(error?.message || "Error al verificar el código");
    } finally {
      setLoading(false);
    }
  };

  const getPickerDate = () => {
    if (!formData.fechaNacimiento) return new Date();
    const parts = formData.fechaNacimiento.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date();
  };

  return {
    step,
    setStep,
    loading,
    token,
    setToken,
    showDate,
    setShowDate,
    showGenderMenu,
    setShowGenderMenu,
    formData,
    updateField,
    errors,
    handleRegisterPress,
    handleVerifyPress,
    getPickerDate,
  };
};