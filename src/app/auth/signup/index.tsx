import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";

const roles = [
  { label: "Usuario", value: "usuario", icon: require("../../../../assets/icons/user.png") },
  { label: "Abogado", value: "abogado", icon: require("../../../../assets/icons/abogado.png") },
  { label: "Doctor", value: "doctor", icon: require("../../../../assets/icons/doctor.png") },
  { label: "Asociación", value: "asociacion", icon: require("../../../../assets/icons/asociacion.png") },
  { label: "Tienda", value: "tienda", icon: require("../../../../assets/icons/tienda.png") },
];

const SignupScreen = () => {
  const router = useRouter();
  const [selectedForm, setSelectedForm] = useState("usuario");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    usuario: { name: "", email: "", password: "", repeatPassword: "", correo: "" },
    abogado: { name: "", email: "", password: "", repeatPassword: "", correo: "", codigoAbogado: "" },
    doctor: { name: "", email: "", password: "", repeatPassword: "", correo: "", codigoDoctor: "" },
    asociacion: { name: "", email: "", password: "", repeatPassword: "", correo: "", ruc: "", codigoAsociacion: "" },
    tienda: { name: "", email: "", password: "", repeatPassword: "", correo: "", ruc: "" },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [selectedForm]: { ...prev[selectedForm], [field]: value },
    }));
  };

  const handleSignup = () => {
    const data = formData[selectedForm];
    if (!data.email || !data.password || !data.repeatPassword) {
      alert("Please fill in all required fields.");
      return;
    }
    if (data.password !== data.repeatPassword) {
      alert("Passwords do not match.");
      return;
    }
    router.push({ pathname: "/login", params: { email: data.email } });
  };

  const renderInput = ({ item }: { item: string }) => (
    <TextInput
      key={item}
      style={styles.input}
      placeholder={item.charAt(0).toUpperCase() + item.slice(1)}
      value={formData[selectedForm][item]}
      onChangeText={(value) => handleInputChange(item, value)}
      secureTextEntry={item === "password" || item === "repeatPassword"}
    />
  );

  const selectedRole = roles.find((role) => role.value === selectedForm);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={60}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.logoContainer}>
          <Image source={require("../../../../assets/logo.png")} style={styles.logo} />
        </View>

        {/* Custom selector con icono */}
        <TouchableOpacity style={styles.selector} onPress={() => setShowModal(true)}>
          <Image source={selectedRole?.icon} style={styles.selectorIcon} />
          <Text style={styles.selectorText}>{selectedRole?.label}</Text>
        </TouchableOpacity>

        {/* Modal con opciones */}
        <Modal visible={showModal} transparent animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowModal(false)}>
            <View style={styles.modalContainer}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedForm(role.value);
                    setShowModal(false);
                  }}
                >
                  <Image source={role.icon} style={styles.modalIcon} />
                  <Text style={styles.modalLabel}>{role.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <FlatList
          data={Object.keys(formData[selectedForm])}
          keyExtractor={(item) => item}
          renderItem={renderInput}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        <CustomButton title="Registro" onPress={handleSignup} style={styles.customButton} />
        <TouchableOpacity onPress={() => router.push("auth/login")}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#DFF5E1",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#2F4F4F",
  },
  logoContainer: {
    backgroundColor: "#1B5E20",
    borderRadius: 80,
    padding: 15,
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C2E5D3",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  selectorIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  selectorText: {
    fontSize: 16,
    color: "#2F4F4F",
  },
  input: {
    height: 42,
    borderColor: "#A3D9A5",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#E9F7EF",
    color: "#2F4F4F",
    fontSize: 14,
  },
  customButton: {
    paddingVertical: 6,
    borderRadius: 60,
    marginTop: 5,
  },
  link: {
    color: "#388E3C",
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    borderRadius: 10,
    padding: 20,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  modalIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  modalLabel: {
    fontSize: 16,
    color: "#333",
  },
});

export default SignupScreen;
