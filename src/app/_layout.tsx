import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { AuthProvider } from "../context/AuthProvider"; // Importa el AuthProvider
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Footer from "./components/Footer";

export default function RootLayout(): JSX.Element {
  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      {" "}
      {/* Envuelve toda la aplicación con el AuthProvider */}
      <View style={styles.container}>    
          {/* Contenedor de las pantallas */}
        <Stack>
          {/* Rutas de detalles */}
          {/*  */}
            <Stack.Screen
              name="lists/doctor"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="lists/lawyer"
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="lists/asociation"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="lists/store"
              options={{ headerShown: false }}
            />

          {/*  */}
          {/* Rutas de detalles */}
          
            <Stack.Screen
              name="aplication/home-app"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="aplication/doctor"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="aplication/lawyer"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="aplication/user"
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="aplication/asociation"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="aplication/store"
              options={{ headerShown: false }}
            />

          {/* Rutas de autenticación */}
          {/* <Stack.Screen name="(auth)/#" options={{ headerShown: false }} /> */}

            <Stack.Screen
              name="auth/profile"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/forgot-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/reset-password"
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="auth/login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/signup"
              options={{ headerShown: false }}
            />
         
        </Stack>

          {/* Footer global */}
          <View style={styles.footer}>
                 <Footer />           
          </View>
          {/* end footer */}
        </View>
    </AuthProvider>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, backgroundColor: "#f0f0f0" },
  headerText: { fontSize: 20, fontWeight: "bold" },
  footer: { padding: 10, backgroundColor: "#f0f0f0" },
  footerText: { textAlign: "center" },
});
