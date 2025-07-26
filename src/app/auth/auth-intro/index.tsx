import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function LoginStartScreen(): JSX.Element {
  const router = useRouter();
  const { selectedCountry } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);

    setTimeout(() => {
      router.push({
        pathname: "/aplication/countrys",
        params: { selectedCountry },
      });
    }, 1000); // Simula una carga de 1 segundo
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* Logo */}
      <View className="w-60 h-60 p-8 rounded-full border-4 border-[#004d32] bg-emerald-900 overflow-hidden mb-10">
        <Image
          source={require("../../../../assets/logo.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>

      {/* Botón Ingresar */}
      <TouchableOpacity
        className={`w-60 rounded-full py-4 mb-8 ${
          loading
            ? "bg-emerald-900"
            : "bg-white border border-[#004d32]"
        }`}
        onPress={handlePress}
        disabled={loading}
      >
        <Text
          className={`text-center font-bold text-lg ${
            loading ? "text-white" : "text-[#004d32]"
          }`}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </Text>
      </TouchableOpacity>

      {/* Botón Registrarse */}
      <TouchableOpacity
        className="w-60 bg-white border border-[#004d32] rounded-full py-4 mb-8"
        onPress={() => router.push("/auth/signup")}
      >
        <Text className="text-center text-[#004d32] font-bold text-lg">
          Registrarse
        </Text>
      </TouchableOpacity>

      {/* País seleccionado */}
      {selectedCountry && (
        <Text className="text-center text-[#004d32] mt-6 text-base">
          País seleccionado: {selectedCountry}
        </Text>
      )}
    </View>
  );
}
