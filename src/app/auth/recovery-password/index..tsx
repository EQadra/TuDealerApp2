import React, { useState } from "react";
import { View, TextInput, Text, Button, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handlePasswordRecovery = async (): Promise<void> => {
    try {
      // Simula el envío del correo de recuperación
      if (!email) {
        Alert.alert("Error", "Please enter your email.");
        return;
      }

      // Aquí normalmente llamarías a tu backend con email
      // Por ejemplo: await api.recoverPassword(email);

      Alert.alert(
        "Success",
        `A password recovery link has been sent to ${email}.`
      );

      // Opcional: redirigir de nuevo al login
      router.push("/auth/login");
    } catch (error) {
      console.error("Error sending recovery email:", error);
      Alert.alert("Error", "There was a problem sending the recovery email.");
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-5">
        Recover Password
      </Text>

      <TextInput
        className="h-10 border border-gray-300 mb-4 px-3 py-2 rounded"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Send Recovery Email" onPress={handlePasswordRecovery} />

      <Text
        className="text-center text-blue-500 mt-5"
        onPress={() => router.push("/auth/login")}
      >
        Back to Login
      </Text>
    </View>
  );
}
