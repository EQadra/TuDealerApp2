import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, TextInput, Text, Button } from "react-native";
import { useAuth } from "../../../context/AuthProvider"; // Importa el hook correctamente

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { login } = useAuth(); // Extraer login correctamente

  const { selectedCountry } = useLocalSearchParams<{
    selectedCountry?: string;
  }>();

  const handleLogin = async (): Promise<void> => {
    try {
      await login(email, password); // Valida el login
      router.push("/aplication/home-app"); // Redirige siempre a home-app
    } catch (error) {
      console.error("Error en login:", error);
      // Puedes mostrar un mensaje si falla
    }
  };
  
  
  return (
    <View className="flex-1 justify-center p-5 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-5">Login</Text>

      <TextInput
        className="h-10 border border-gray-300 mb-4 px-3 py-2 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="h-10 border border-gray-300 mb-4 px-3 py-2 rounded"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />

      {selectedCountry && (
        <Text className="text-center mt-2 text-gray-600">
          Selected Country: {selectedCountry}
        </Text>
      )}

      <View className="mt-5">
        <Text
          className="text-center text-blue-500"
          onPress={() => router.push("/auth/forgot-password")}
        >
          Forgot Password?
        </Text>
        <Text
          className="text-center text-blue-500 mt-2"
          onPress={() => router.push("/auth/signup")}
        >
          Don't have an account? Sign Up
        </Text>
      </View>
    </View>
  );
}
