import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function LoginStartScreen(): JSX.Element {
  const router = useRouter();
  const { selectedCountry } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* Logo con borde circular */}
      <View className="w-40 h-40 rounded-full border-4 border-[#004d32] overflow-hidden mb-10">
        <Image
          source={require("../../../../assets/logo.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>

      {/* Botón Ingresar */}
      <TouchableOpacity
        className="w-full bg-white border border-[#004d32] rounded-lg py-4 mb-4"
        onPress={() =>
          router.push({
            pathname: "/aplication/countrys",
            params: { selectedCountry },
          })
        }
      >
        <Text className="text-center text-[#004d32] font-bold text-lg">
          Ingresar
        </Text>
      </TouchableOpacity>

      {/* Botón Registrarse */}
      <TouchableOpacity
        className="w-full bg-white border border-[#004d32] rounded-lg py-4"
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
