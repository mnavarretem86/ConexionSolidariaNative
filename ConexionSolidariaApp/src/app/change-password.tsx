import { View, Text, TextInput, Pressable, ActivityIndicator, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChangePassword } from "../hooks/useChangePassword";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ChangePasswordScreen() {
  const router = useRouter();
  
  const {
    newPassword, 
    setNewPassword,
    confirmPassword, 
    setConfirmPassword,
    handleUpdate, 
    loading
  } = useChangePassword();

  const onConfirm = async () => {
    Keyboard.dismiss();
    await handleUpdate(() => {
      router.replace("/login");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
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
          paddingHorizontal: 24
        }}
      >
        <View className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          
          <View className="items-center mb-6">
            <View className="bg-blue-50 p-4 rounded-full mb-4">
              <Ionicons name="key-outline" size={32} color="#0066FF" />
            </View>

            <Text className="text-2xl font-black text-gray-900">
              Seguridad
            </Text>

            <Text className="text-gray-500 text-center mt-2">
              Tu contraseña actual es temporal. Por favor, crea una nueva para continuar.
            </Text>
          </View>

          <TextInput
            placeholder="Nueva Contraseña"
            secureTextEntry
            className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 text-gray-800"
            value={newPassword}
            onChangeText={setNewPassword}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Confirmar Nueva Contraseña"
            secureTextEntry
            className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 text-gray-800"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            returnKeyType="done"
            onSubmitEditing={onConfirm}
          />

          <Pressable 
            onPress={onConfirm}
            disabled={loading}
            className={`p-4 rounded-2xl items-center shadow-lg shadow-blue-200 ${
              loading ? "bg-blue-300" : "bg-[#0066FF]"
            }`}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff"/> 
            ) : (
              <Text className="text-white font-bold text-lg">
                Guardar Cambios
              </Text>
            )}
          </Pressable>

          <Pressable 
            onPress={() => router.replace("/")} 
            className="mt-6 items-center"
          >
            <Text className="text-gray-400 font-bold tracking-widest uppercase text-xs">
              Cancelar
            </Text>
          </Pressable>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}