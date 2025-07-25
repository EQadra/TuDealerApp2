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

const badges = [
  {
    title: "Asociación",
    description: "Información de asociaciones disponibles",
    image: require("../../../../assets/6.png"),
    route: "lists/asociation",
  },
  {
    title: "Doctor",
    description: "Listado de doctores certificados",
    image: require("../../../../assets/7.png"),
    route: "lists/doctor",
  },
  {
    title: "Abogado",
    description: "Contacta abogados registrados",
    image: require("../../../../assets/8.png"),
    route: "lists/lawyer",
  },
  {
    title: "Usuario",
    description: "Acceso a la cuenta de usuario",
    image: require("../../../../assets/9.png"),
    route: "lists/store",
  },
  {
    title: "Soporte",
    description: "Ayuda y contacto con soporte",
    image: require("../../../../assets/10.png"), // Asegúrate que exista esta imagen
    route: "lists/support",
  },
];

const HomeApp: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo circular */}
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logo}
        />

        {/* Título principal */}
        <Text style={styles.mainTitle}>Bienvenido a la App</Text>

        {/* Badges con imagen, título y descripción */}
        <View style={styles.badgeList}>
          {badges.map((item, index) => (
            <Link key={index} href={item.route} asChild>
              <TouchableOpacity style={styles.badge}>
                <Image source={item.image} style={styles.badgeImage} />
                <View style={styles.badgeTextContainer}>
                  <Text style={styles.badgeTitle}>{item.title}</Text>
                  <Text style={styles.badgeDescription}>
                    {item.description}
                  </Text>
                </View>
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
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // Hacerlo circular
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F4F4F",
    marginBottom: 30,
    textAlign: "center",
  },
  badgeList: {
    width: "100%",
    gap: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#2E8B57",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  badgeTextContainer: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2F4F4F",
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default HomeApp;
