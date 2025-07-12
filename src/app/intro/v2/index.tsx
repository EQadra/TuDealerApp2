import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { useRouter } from "expo-router"; // 👈 Importa el router



const { width, height } = Dimensions.get("window");

export default function secondView() {
  const router = useRouter(); // 👈 Hook para navegación

  const handleSkipPress = () => {
    router.push("/auth/login"); // 🔁 Cambia "/home" por la ruta deseada
  };
  

  const handlePlayPress = () => {
    router.push("/intro/v3"); // 👈 Asegúrate que /nextScreen exista
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Skip button */}
        <View style={styles.header}>
        <TouchableOpacity style={styles.skipBadge} onPress={handleSkipPress}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        </View>

        {/* Center image */}
        <Image
          source={require("../../../../assets/2.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>App Exclusiva para Latam</Text>

        {/* Description */}
        <Text style={styles.description}>
          TuDealer App es la primera red social Cannabica de todo latinoamerica
          y es un hito para las nuevas generaciones y comunidades.
        </Text>

        {/* Progress Dots + Play Button */}
        <View style={styles.progressRow}>
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            <Svg width={20} height={20} viewBox="0 0 100 100">
              <Polygon points="40,30 70,50 40,70" fill="#fff" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6F6",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: width * 0.9,
    height: height * 0.85,
    backgroundColor: "#004c31", // Verde oscuro
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:20,
  },
  header: {
    alignItems: "flex-end",
  },
  skipButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: height * 0.4, // 40% de la pantalla
    marginVertical: 20,
    marginLeft:20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  skipBadge: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 50, // más redondo, estilo badge
    paddingVertical: 2,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },  
  dot: {
    width: 20,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007BFF",
  },
});
