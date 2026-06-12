import { useState } from "react";
import { useAuth } from "./useAuth";
import Toast from "react-native-toast-message";

export const useChangePassword = () => {
  const { changePassword, loading } = useAuth();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validate = () => {
    if (!newPassword || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Campos vacíos",
        text2: "Debes llenar todos los campos",
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Las contraseñas no coinciden",
      });
      return false;
    }

    if (newPassword.length < 6) {
      Toast.show({
        type: "error",
        text1: "Seguridad",
        text2: "La contraseña debe tener al menos 6 caracteres",
      });
      return false;
    }

    return true;
  };

  const handleUpdate = async (onSuccess: () => void) => {
    if (!validate()) return;

    try {
      await changePassword(newPassword);

      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: "Contraseña actualizada correctamente",
      });

      onSuccess();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error de servidor",
        text2: err.message || "No pudimos cambiar la contraseña",
      });
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdate,
    loading,
  };
};