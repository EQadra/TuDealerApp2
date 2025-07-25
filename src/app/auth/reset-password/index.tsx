import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, TextInput, Text, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";

export default function ResetPasswordScreen(): JSX.Element {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const handleResetPassword = (): void => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    console.log("Resetting password for:", email);
    console.log("New Password:", newPassword);
    router.replace("/auth/login");
  };

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Text className="text-2xl font-bold text-center mb-5 text-[#004d32]">
        Reset Password
      </Text>

      {email && (
        <Text className="text-center mb-3 text-[#5e8276]">
          Resetting for: {email}
        </Text>
      )}

      <TextInput
        className="h-12 border border-[#b4dccf] mb-4 px-4 rounded bg-[#f4fdf9] text-[#004d32]"
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#7CA290"
      />

      <TextInput
        className="h-12 border border-[#b4dccf] mb-4 px-4 rounded bg-[#f4fdf9] text-[#004d32]"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#7CA290"
      />

      <CustomButton title="Reset Password" onPress={handleResetPassword} />

      <Text
        className="text-center text-[#004d32] mt-4"
        onPress={() => router.push("/auth/login")}
      >
        Back to Login
      </Text>
    </View>
  );
}
