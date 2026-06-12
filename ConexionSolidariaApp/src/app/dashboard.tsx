import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router"; 
import { useEffect, useState, useMemo } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { obtenerEventos, obtenerInscripciones } from "../services/dashboard";

export default function DashboardScreen() {
  const router = useRouter();
  const { nombre } = useLocalSearchParams(); 
  console.log("Parámetros recibidos en Dashboard:", nombre);

  
  const [eventos, setEventos] = useState<any[]>([]);
  const [inscripciones, setInscripciones] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      const [dataEventos, dataInscripciones] = await Promise.all([
        obtenerEventos(),
        obtenerInscripciones()
      ]);
      setEventos(dataEventos);
      setInscripciones(dataInscripciones);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  const handleLogout = () => router.replace("/");

  const eventosFiltrados = useMemo(() => 
    eventos.filter(e => e.Nombre.toLowerCase().includes(busqueda.toLowerCase())),
  [eventos, busqueda]);

  const stats = {
    eventos: eventos.length,
    inscritos: inscripciones.length,
    cupos: eventos.reduce((sum, e) => sum + (e.CupoMaximo - e.TotalInscritos), 0),
    activos: eventos.filter(e => e.EstadoEvento === "Programado").length
  };

  const statsConfig = [
    { label: "EVENTOS", val: stats.eventos, icon: "calendar", color: "#3B82F6", bg: "bg-blue-100" },
    { label: "INSCRITOS", val: stats.inscritos, icon: "people", color: "#10B981", bg: "bg-green-100" },
    { label: "CUPOS", val: stats.cupos, icon: "ticket", color: "#F59E0B", bg: "bg-yellow-100" },
    { label: "ACTIVOS", val: stats.activos, icon: "flash", color: "#8B5CF6", bg: "bg-purple-100" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0066FF]" edges={["top"]}>
      <View className="flex-1 bg-gray-50">
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="bg-[#0066FF] px-6 pt-4 pb-20 rounded-b-[40px]">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <View className="bg-white/20 p-2 rounded-xl mr-3">
                  <Ionicons name="apps" size={20} color="white" />
                </View>
                <Text className="text-white font-bold text-lg tracking-widest">PANEL</Text>
              </View>
              
              <TouchableOpacity onPress={handleLogout} className="bg-white/20 px-4 py-2 rounded-full flex-row items-center">
                <Text className="text-white font-bold mr-2 text-xs">Salir</Text>
                <Ionicons name="log-out-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-white/80 text-sm font-medium mb-1">Hola de nuevo,</Text>
            <Text className="text-white text-3xl font-black">{nombre || "Usuario"}</Text>
          </View>

          {cargando ? (
            <ActivityIndicator size="large" color="#0066FF" className="mt-20" />
          ) : (
            <>
              <View className="px-5 -mt-14 flex-row flex-wrap justify-between">
                {statsConfig.map((stat, i) => (
                  <View key={i} className="w-[48%] mb-3">
                    <View className="bg-white p-4 rounded-2xl shadow-sm shadow-gray-200 border border-gray-100">
                      <View className="flex-row justify-between items-start mb-2">
                        <View className={`p-2 rounded-full ${stat.bg}`}>
                          <Ionicons name={stat.icon as any} size={18} color={stat.color} />
                        </View>
                        <Text className="text-2xl font-black text-gray-800">{stat.val}</Text>
                      </View>
                      <Text className="text-[10px] text-gray-400 font-bold tracking-wider">{stat.label}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="px-5 mt-2 mb-6">
                <View className="bg-white rounded-2xl border border-gray-200 flex-row items-center px-4 py-3 shadow-sm shadow-gray-100">
                  <Ionicons name="search" size={20} color="#9CA3AF" />
                  <TextInput 
                    placeholder="Buscar evento por nombre..." 
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 ml-3 text-gray-800 font-medium"
                    value={busqueda}
                    onChangeText={setBusqueda}
                  />
                  {busqueda.length > 0 && (
                    <TouchableOpacity onPress={() => setBusqueda("")}>
                      <Ionicons name="close-circle" size={20} color="#D1D5DB" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View className="px-5 mb-6">
                <View className="flex-row justify-between items-end mb-4">
                  <Text className="font-black text-lg text-gray-900">Eventos Recientes</Text>
                  <Text className="text-xs font-bold text-[#0066FF]">Ver todos</Text>
                </View>

                {eventosFiltrados.length === 0 ? (
                  <View className="bg-white p-6 rounded-2xl items-center border border-gray-100">
                    <Ionicons name="calendar-clear-outline" size={40} color="#D1D5DB" style={{ marginBottom: 8 }}/>
                    <Text className="text-gray-400 font-medium text-center">No se encontraron eventos</Text>
                  </View>
                ) : (
                  eventosFiltrados.map((evt, i) => (
                    <View key={i} className="bg-white p-4 rounded-2xl mb-3 shadow-sm shadow-gray-100 border border-gray-100 flex-row items-center">
                      <View className="bg-blue-50 p-3 rounded-xl mr-4">
                        <Ionicons name="calendar" size={24} color="#0066FF" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-gray-800 text-base mb-1">{evt.Nombre}</Text>
                        <View className="flex-row items-center">
                          <Ionicons name="location-outline" size={12} color="#9CA3AF" />
                          <Text className="text-xs text-gray-500 ml-1 mr-3" numberOfLines={1}>{evt.Lugar}</Text>
                        </View>
                      </View>
                      <View className={`px-2 py-1 rounded-md ${evt.EstadoEvento === "Programado" ? "bg-green-100" : "bg-gray-100"}`}>
                        <Text className={`text-[10px] font-bold ${evt.EstadoEvento === "Programado" ? "text-green-700" : "text-gray-600"}`}>
                          {evt.EstadoEvento}
                        </Text>
                      </View>
                    </View>
                  ))
                )}
              </View>

              <View className="px-5 mb-4">
                <Text className="font-black text-lg text-gray-900 mb-4">Últimas Inscripciones</Text>
                <View className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm shadow-gray-100">
                  {inscripciones.length === 0 ? (
                     <Text className="text-gray-400 font-medium text-center py-4">No hay inscritos aún</Text>
                  ) : (
                    inscripciones.map((ins, i) => (
                      <View key={i} className={`flex-row items-center p-3 ${i !== inscripciones.length - 1 ? "border-b border-gray-50" : ""}`}>
                        <View className="w-10 h-10 rounded-full bg-[#0066FF]/10 items-center justify-center mr-3">
                          <Text className="font-black text-[#0066FF] text-sm">
                            {ins.NombreVoluntario?.charAt(0).toUpperCase() || "?"}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-bold text-gray-800">{ins.NombreVoluntario}</Text>
                          <Text className="text-[11px] text-gray-400 mt-0.5" numberOfLines={1}>{ins.Evento}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                      </View>
                    ))
                  )}
                </View>
              </View>
            </>
          )}
        </ScrollView>

        <SafeAreaView edges={["bottom"]} className="bg-white border-t border-gray-100 shadow-lg">
          <View className="flex-row justify-around py-2">
            <TouchableOpacity className="items-center p-2">
              <View className="bg-blue-50 px-4 py-1 rounded-full mb-1">
                <Ionicons name="home" size={20} color="#0066FF" />
              </View>
              <Text className="text-[10px] font-bold text-[#0066FF]">Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center p-2">
              <View className="px-4 py-1 mb-1">
                <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
              </View>
              <Text className="text-[10px] font-bold text-gray-400">Eventos</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center p-2">
              <View className="px-4 py-1 mb-1">
                <Ionicons name="shield-checkmark-outline" size={20} color="#9CA3AF" />
              </View>
              <Text className="text-[10px] font-bold text-gray-400">Permisos</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}