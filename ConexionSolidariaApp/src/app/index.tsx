import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();

  const impactStats = [
    { val: "+100", label: "Voluntarios", icon: "people", color: "#0066FF", bg: "bg-blue-100" },
    { val: "+40", label: "Eventos", icon: "calendar", color: "#10B981", bg: "bg-green-100" },
    { val: "+1.2k", label: "Horas", icon: "time", color: "#F59E0B", bg: "bg-yellow-100" },
    { val: "100%", label: "Digital", icon: "globe", color: "#8B5CF6", bg: "bg-purple-100" },
  ];

  const steps = [
    { num: "1", title: "Regístrate", desc: "Crea tu perfil como voluntario o institución de forma gratuita." },
    { num: "2", title: "Explora", desc: "Busca causas y eventos alineados con tus intereses y habilidades." },
    { num: "3", title: "Participa", desc: "Involúcrate, conecta con otros y transforma vidas en tu comunidad." }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      
      <View className="items-center justify-center py-4 bg-white z-10 border-b border-gray-50">
        <View className="flex-row items-center">
          <View className="bg-[#0066FF]/10 p-2 rounded-xl mr-2">
            <Ionicons name="heart" size={20} color="#0066FF" />
          </View>
          <Text className="text-gray-900 font-black text-xl tracking-tighter">
            Conexión<Text className="text-[#0066FF]">Solidaria</Text>
          </Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <View className="px-6 pt-10 pb-6 bg-white">
          <View className="bg-blue-50 self-start px-3 py-1.5 rounded-full flex-row items-center mb-5 border border-blue-100">
            <Ionicons name="sparkles" size={14} color="#0066FF" />
            <Text className="text-[#0066FF] text-xs font-bold ml-1.5 tracking-wide uppercase">
              Únete al cambio
            </Text>
          </View>

          <Text className="text-5xl font-black text-gray-900 leading-[52px] tracking-tight">
            Conectando{"\n"}personas con{"\n"}
            <Text className="text-[#0066FF]">causas reales.</Text>
          </Text>

          <Text className="text-gray-500 mt-6 text-base leading-7 font-medium">
            Impulsa el voluntariado y la organización de eventos sociales. Conecta al instante con iniciativas que generan impacto real en tu comunidad.
          </Text>
        </View>

        <View className="px-6 pt-8 bg-gray-50/50 pb-8 rounded-t-[40px] mt-2">
          <Text className="text-sm font-black text-gray-400 mb-6 tracking-widest uppercase ml-2">
            Nuestro Impacto
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {impactStats.map((item, i) => (
              <View key={i} className="w-[48%] mb-4">
                <View className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm shadow-gray-100 items-start">
                  <View className={`${item.bg} p-2.5 rounded-2xl mb-3`}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text className="text-3xl font-black text-gray-900">
                    {item.val}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-wider">
                    {item.label}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="px-6 pt-10">
          <Text className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
            ¿Cómo funciona?
          </Text>

          <View className="gap-y-8">
            {steps.map((step, i) => (
              <View key={i} className="flex-row items-start">
                <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mr-4 border border-blue-100">
                  <Text className="text-lg font-black text-[#0066FF]">
                    {step.num}
                  </Text>
                </View>
                <View className="flex-1 pt-1">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {step.title}
                  </Text>
                  <Text className="text-sm text-gray-500 leading-6 font-medium">
                    {step.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full px-6 pt-4 pb-8 bg-white border-t border-gray-100 shadow-2xl">
        <Pressable
          android_ripple={{ color: "#1d4ed8" }}
          style={({ pressed }) => [
            { transform: [{ scale: pressed ? 0.98 : 1 }] }
          ]}
          className="bg-[#0066FF] py-4 rounded-2xl items-center shadow-md shadow-blue-200 flex-row justify-center mb-4"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white font-bold text-lg mr-2">
            Ingresar
          </Text>
          <Ionicons name="log-in-outline" size={22} color="white" />
        </Pressable>

        <TouchableOpacity 
          className="flex-row items-center justify-center py-2"
          onPress={() => router.push("/registro")}
        >
          <Text className="text-gray-500 font-medium text-sm mr-1">
            ¿No tienes una cuenta?
          </Text>
          <Text className="text-[#0066FF] font-bold text-sm">
            Regístrate
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}