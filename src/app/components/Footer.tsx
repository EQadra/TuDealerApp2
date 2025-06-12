import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.footer, { paddingBottom: bottom }]}>
      <Text style={styles.footerText}>© {new Date().getFullYear()} Me</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    paddingVertical: 12,
  },
  footerText: { color: "#555", fontSize: 14 },
});
