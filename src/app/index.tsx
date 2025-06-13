import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

const COUNTRIES = [
  { name: "Perú", imageUrl: "https://flagcdn.com/w320/pe.png" },
  { name: "Colombia", imageUrl: "https://flagcdn.com/w320/co.png" },
  { name: "Chile", imageUrl: "https://flagcdn.com/w320/cl.png" },
  { name: "Uruguay", imageUrl: "https://flagcdn.com/w320/uy.png" },
  { name: "Argentina", imageUrl: "https://flagcdn.com/w320/ar.png" },
  { name: "Brasil", imageUrl: "https://flagcdn.com/w320/br.png" },
];

export default function CountrySelector() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const router = useRouter();

  const handleSelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country.name);
    setSelectedImage(country.imageUrl);
    setModalVisible(false);

    // ✅ Redirigir a la vista login con el país como parámetro
    router.push({
      pathname: "/auth/login",
      params: { selectedCountry: country.name },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedCountry || "Selecciona tu país"}
        </Text>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.flagSmall} />
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={COUNTRIES}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.flag} />
                <Text style={styles.countryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={{ color: "#fff" }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda la pantalla
    justifyContent: "center", // centra verticalmente
    alignItems: "center", // centra horizontalmente
    backgroundColor: "#DFF5E1", // fondo pastel verde
    padding: 20,
  },
  selector: {
    borderWidth: 1,
    borderColor: "#2F4F4F",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#C2E5D3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // puedes cambiar a un ancho fijo si prefieres
    maxWidth: 350,
  },
  selectorText: {
    fontSize: 16,
    color: "#2F4F4F",
  },
  flagSmall: {
    width: 32,
    height: 20,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DFF5E1",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  flag: {
    width: 40,
    height: 26,
    marginRight: 15,
    borderRadius: 4,
  },
  countryName: {
    fontSize: 16,
    color: "#2F4F4F",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});
