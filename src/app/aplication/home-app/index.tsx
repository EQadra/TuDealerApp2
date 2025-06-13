import { Link } from "expo-router";
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const routes = [
  {
    title: "Asociación",
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    route: "lists/asociation",
  },
  {
    title: "Doctor",
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    route: "lists/doctor",
  },
  {
    title: "Abogado",
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    route: "lists/lawyer",
  },
  {
    title: "Usuario",
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    route: "lists/store",
  },
];

const HomeApp: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Selecciona una opción</Text>
        <View style={styles.cardContainer}>
          {routes.map((item, index) => (
            <Link key={index} href={item.route} asChild>
              <TouchableOpacity style={styles.card}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>{item.title}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFF5E1",
  },
  scrollContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2F4F4F",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "45%",           // Dos tarjetas por fila
    margin: "2.5%",         // Espacio entre tarjetas
    aspectRatio: 0.9,       // Ajusta altura proporcional
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    shadowColor: "#2E8B57",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "65%",
    borderRadius: 10,
    marginBottom: 8,
  },
  cardText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "#2F4F4F",
  },
});

export default HomeApp;