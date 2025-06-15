import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const { bottom } = useSafeAreaInsets();
  const [modalType, setModalType] = useState<null | "privacidad" | "terminos" | "acerca">(
    null
  );

  const modalData = {
    privacidad: {
      title: "Política de Privacidad",
      text: "Esta es una política de privacidad de ejemplo. Aquí iría la descripción sobre cómo manejamos tus datos.",
      image: "https://picsum.photos/300?random=1",
    },
    terminos: {
      title: "Términos y Condiciones",
      text: "Estos son los términos de uso del servicio. Por favor, léelos con atención.",
      image: "https://picsum.photos/300?random=2",
    },
    acerca: {
      title: "Acerca de",
      text: "Esta es una app desarrollada con React Native para fines demostrativos.",
      image: "https://picsum.photos/300?random=3",
    },
  };

  return (
    <View style={[styles.footer, { paddingBottom: bottom }]}>
      <Text style={styles.footerText}>© {new Date().getFullYear()} Me</Text>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => setModalType("privacidad")}>
          <Text style={styles.linkText}>Privacidad</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalType("terminos")}>
          <Text style={styles.linkText}>Términos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalType("acerca")}>
          <Text style={styles.linkText}>Acerca de</Text>
        </TouchableOpacity>
      </View>

      {/* Modal genérico que usa modalType */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalType !== null}
        onRequestClose={() => setModalType(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {modalType && (
              <>
                <Image
                  source={{ uri: modalData[modalType].image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{modalData[modalType].title}</Text>
                <Text style={styles.modalText}>{modalData[modalType].text}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalType(null)}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    paddingVertical: 16,
  },
  footerText: {
    color: "#065F46",
    fontSize: 14,
    marginBottom: 6,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  linkText: {
    color: "#047857",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    width: "80%",
  },
  modalImage: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#065F46",
    marginBottom: 8,
  },
  modalText: {
    color: "#065F46",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#10B981",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
