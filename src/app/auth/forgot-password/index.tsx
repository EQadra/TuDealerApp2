import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, TextInput, Text } from "react-native";
import CustomButton from "../../components/CustomButton"; // Ajusta la ruta según corresponda

export default function ForgotPasswordScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleResetPassword = (): void => {
    console.log("Reset password for:", email);
    router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <View className="flex-1 justify-center p-5 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-5">
        Forgot Password
      </Text>
      <TextInput
        className="h-10 border border-gray-300 mb-4 px-3 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomButton title="Reset Password" onPress={handleResetPassword} />
      <Text
        className="text-center text-blue-500 mt-4"
        onPress={() => router.push("/auth/login")}
      >
        Back to Login
      </Text>
    </View>
  );
}
