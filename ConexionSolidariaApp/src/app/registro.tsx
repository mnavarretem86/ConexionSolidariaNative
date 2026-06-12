import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useRegistroForm } from "../hooks/useRegistroForm";

export default function RegistroScreen() {
  const router = useRouter();
  
  const {
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
    handleRegisterPress,
    handleVerifyPress,
    getPickerDate,
  } = useRegistroForm();

  const genderOptions = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
  ];

  const inputClass =
    "bg-[#F4F6F9] text-gray-800 rounded-2xl p-4 border border-gray-100 font-medium";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-[#0066FF] px-6 py-5 flex-row items-center rounded-b-3xl mb-2">
        <TouchableOpacity
          onPress={() => (step === 2 ? setStep(1) : router.back())}
          className="bg-white/20 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-black text-xl ml-4">
          {step === 1 ? "Nuevo Registro" : "Verificación"}
        </Text>
      </View>

      <KeyboardAwareScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        enableOnAndroid={true}
        extraHeight={120} 
        extraScrollHeight={Platform.OS === "ios" ? 50 : 80}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {step === 1 ? (
          <View className="py-4">
            <Text className="text-gray-400 mb-6 font-medium">
              Completa tus datos para unirte.
            </Text>

            <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
              <Text className="text-[#0066FF] font-bold mb-4 uppercase text-xs tracking-widest">
                Datos Personales
              </Text>

              <View className="flex-row justify-between mb-4">
                <TextInput
                  placeholder="1er Nombre"
                  value={formData.primerNombre}
                  onChangeText={(v) => updateField("primerNombre", v)}
                  className={`${inputClass} w-[48%]`}
                />
                <TextInput
                  placeholder="2do Nombre"
                  value={formData.segundoNombre}
                  onChangeText={(v) => updateField("segundoNombre", v)}
                  className={`${inputClass} w-[48%]`}
                />
              </View>

              <View className="flex-row justify-between mb-4">
                <TextInput
                  placeholder="1er Apellido"
                  value={formData.primerApellido}
                  onChangeText={(v) => updateField("primerApellido", v)}
                  className={`${inputClass} w-[48%]`}
                />
                <TextInput
                  placeholder="2do Apellido"
                  value={formData.segundoApellido}
                  onChangeText={(v) => updateField("segundoApellido", v)}
                  className={`${inputClass} w-[48%]`}
                />
              </View>

              <TextInput
                placeholder="Número de DNI"
                value={formData.dni}
                onChangeText={(v) => updateField("dni", v)}
                maxLength={14}
                className={`${inputClass} mb-4`}
              />

              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setShowDate(true)}
                  className={`${inputClass} w-[48%] justify-center`}
                >
                  <Text
                    className={
                      formData.fechaNacimiento ? "text-gray-800" : "text-gray-400"
                    }
                  >
                    {formData.fechaNacimiento || "Nacimiento"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowGenderMenu(!showGenderMenu)}
                  className={`${inputClass} w-[48%] justify-center`}
                >
                  <Text
                    className={
                      formData.genero ? "text-gray-800" : "text-gray-400"
                    }
                  >
                    {formData.genero
                      ? formData.genero === "M"
                        ? "Masculino"
                        : "Femenino"
                      : "Género"}
                  </Text>
                </TouchableOpacity>
              </View>

              {showGenderMenu && (
                <View className="bg-[#F4F6F9] rounded-2xl mt-2 overflow-hidden border border-gray-100">
                  {genderOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt.value}
                      onPress={() => {
                        updateField("genero", opt.value);
                        setShowGenderMenu(false);
                      }}
                      className="p-4 border-b border-gray-200 last:border-0"
                    >
                      <Text className="text-gray-800 font-bold">{opt.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-8 shadow-sm">
              <Text className="text-[#0066FF] font-bold mb-4 uppercase text-xs tracking-widest">
                Contacto
              </Text>
              <TextInput
                placeholder="Correo electrónico"
                value={formData.email}
                onChangeText={(v) => updateField("email", v)}
                keyboardType="email-address"
                autoCapitalize="none"
                className={`${inputClass} mb-4`}
              />
              <TextInput
                placeholder="Teléfono"
                value={formData.telefono}
                onChangeText={(v) => updateField("telefono", v)}
                keyboardType="phone-pad"
                className={`${inputClass} mb-4`}
              />
              <TextInput
                placeholder="Dirección"
                value={formData.direccion}
                onChangeText={(v) => updateField("direccion", v)}
                className={inputClass}
              />
            </View>

            <TouchableOpacity
              onPress={handleRegisterPress}
              className="bg-[#0066FF] py-4 rounded-2xl mb-10 items-center"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Solicitar Código</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View className="py-20 px-4 items-center">
            <View className="bg-blue-50 p-6 rounded-full mb-6">
              <Ionicons name="mail-outline" size={40} color="#0066FF" />
            </View>

            <Text className="text-2xl font-black mb-4">Verifica tu código</Text>

            <TextInput
              value={token}
              onChangeText={setToken}
              keyboardType="number-pad"
              maxLength={6}
              className={`${inputClass} w-full text-center text-3xl font-black tracking-[10px] mb-6`}
            />

            <TouchableOpacity
              onPress={handleVerifyPress}
              className="bg-[#0066FF] w-full py-4 rounded-2xl items-center"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold">Finalizar Registro</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {showDate && (
          <DateTimePicker
            value={getPickerDate()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onValueChange={(event, selectedDate) => {
              if (Platform.OS === "android") {
                setShowDate(false);
              }

              if (selectedDate) {
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
                const day = String(selectedDate.getDate()).padStart(2, "0");
                
                updateField("fechaNacimiento", `${year}-${month}-${day}`);
              }
            }}
            onDismiss={() => {
              if (Platform.OS === "android") {
                setShowDate(false);
              }
            }}
          />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}