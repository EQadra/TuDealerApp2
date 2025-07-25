import React, { useState } from "react";
import { View, TextInput, Text, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handlePasswordRecovery = async (): Promise<void> => {
    try {
      if (!email) {
        Alert.alert("Error", "Please enter your email.");
        return;
      }

      Alert.alert("Success", `A password recovery link has been sent to ${email}.`);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error sending recovery email:", error);
      Alert.alert("Error", "There was a problem sending the recovery email.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recover Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#7CA290"
      />

      <Button
        title="Send Recovery Email"
        onPress={handlePasswordRecovery}
        color="#004d32"
      />

      <Text style={styles.link} onPress={() => router.push("/auth/login")}>
        Back to Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff", // Cambiado a blanco
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#004d32", // Verde oscuro
  },
  input: {
    height: 50,
    borderColor: "#b4dccf",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f4fdf9",
    color: "#004d32",
    marginBottom: 15,
  },
  link: {
    textAlign: "center",
    color: "#004d32",
    marginTop: 20,
    fontSize: 16,
  },
});
