import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Switch,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

const Header: React.FC<{ darkMode: boolean; setDarkMode: (val: boolean) => void }> = ({
  darkMode,
  setDarkMode,
}) => {
  const { top } = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-250));

  const toggleMenu = () => {
    if (menuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setMenuVisible(true));
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  return (
    <View style={{ paddingTop: top }} className="bg-transparent z-10">
      {/* Top bar */}
      <View
        className={`px-4 h-14 flex-row items-center justify-between ${
          darkMode ? "bg-gray-900" : "bg-sky-500"
        }`}
      >
        {/* Logo + nombre */}
        <View className="flex-row items-center gap-3">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2907/2907241.png",
            }}
            style={{ width: 28, height: 28 }}
          />
          <Text className="text-white font-bold text-lg">Nombre de Empresa</Text>
        </View>

        {/* Controles lado derecho */}
        <View className="flex-row items-center gap-4">
          <FontAwesome5
            name={darkMode ? "moon" : "sun"}
            size={18}
            color={darkMode ? "#facc15" : "#fbbf24"}
          />
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#facc15" : "#ccc"}
            trackColor={{ false: "#767577", true: "#d97706" }}
          />
          <TouchableOpacity onPress={toggleMenu}>
            <FontAwesome5
              name={menuVisible ? "times" : "bars"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menú lateral */}
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          position: "absolute",
          top: top + 56,
          left: 0,
          width: "65%",
          height: "100%",
          backgroundColor: "#111",
          paddingHorizontal: 16,
          paddingVertical: 20,
          zIndex: 100,
        }}
      >
        <Text className="text-white font-bold text-lg mb-6 border-b border-gray-700 pb-2">
          Menú Principal
        </Text>

        {[
          { title: "Inicio", icon: "home" },
          { title: "Historial", icon: "history" },
          { title: "Ajustes", icon: "cog" },
        ].map((item, i) => (
          <TouchableOpacity
            key={i}
            className="flex-row items-center gap-4 py-4 border-b border-gray-700"
            onPress={() => {
              Alert.alert(`${item.title} seleccionado`);
              closeMenu();
            }}
          >
            <View className="p-3 rounded-full bg-emerald-500">
              <FontAwesome5 name={item.icon} size={20} color="white" />
            </View>
            <Text className="text-white text-base font-medium">{item.title}</Text>
          </TouchableOpacity>
        ))}

        <View className="mt-8">
          <Text className="text-center text-gray-400">Versión 1.0.0</Text>
        </View>
      </Animated.View>

      {/* Fondo oscurecido al abrir menú */}
      {menuVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeMenu}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 50,
          }}
        />
      )}
    </View>
  );
};

export default Header;
