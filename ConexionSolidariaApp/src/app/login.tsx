// src/app/login.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import Toast from "react-native-toast-message";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !contrasena) {
      Toast.show({
        type: "error",
        text1: "Campos requeridos",
        text2: "Ingresa tu correo y contraseña",
      });
      return;
    }

    try {
      const res = await login(email, contrasena);
      const isTemporary = res.cambiarPassword;

      Toast.show({
        type: "success",
        text1: isTemporary ? "Antes de empezar" : "Bienvenido",
        text2: isTemporary 
          ? "Tu contraseña es temporal. Actualízala para continuar." 
          : `Hola ${res.nombre}`,
        visibilityTime: isTemporary ? 4000 : 2500,
      });

      // 3. Redirección
      setTimeout(() => {
        if (isTemporary) {
          router.replace("/change-password");
        } else {
          router.replace({
            pathname: "/dashboard",
            params: { nombre: res.nombre },
          });
        }
      }, 800);

    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Acceso denegado",
        text2: err?.message || "Credenciales incorrectas",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={100}
        extraHeight={120}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        <View>
          <View className="items-center mb-10">
            <View className="bg-blue-50 p-6 rounded-3xl mb-6">
              <Ionicons name="shield-checkmark" size={48} color="#0066FF" />
            </View>

            <Text className="text-3xl font-black text-gray-900 mb-2">
              Bienvenido de nuevo
            </Text>

            <Text className="text-gray-500 text-center text-base px-4">
              Inicia sesión para retomar tus actividades en Conexión Solidaria.
            </Text>
          </View>

          <View className="gap-y-4">
            <View className="bg-[#F4F6F9] rounded-2xl border border-gray-100 flex-row items-center px-4">
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 p-4 text-gray-800 text-base font-medium"
                placeholder="Correo electrónico"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>

            <View className="bg-[#F4F6F9] rounded-2xl border border-gray-100 flex-row items-center px-4">
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                ref={passwordRef}
                className="flex-1 p-4 text-gray-800 text-base font-medium"
                placeholder="Contraseña"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={contrasena}
                onChangeText={setContrasena}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="p-2"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className={`py-4 rounded-2xl items-center mt-8 shadow-md shadow-blue-200 ${
              loading ? "bg-blue-300" : "bg-[#0066FF]"
            }`}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Ingresar
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            className="mt-8 items-center"
          >
            <Text className="text-gray-400 font-bold text-sm uppercase tracking-widest">
              Cancelar y volver
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}