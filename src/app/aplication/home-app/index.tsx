import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";

const HomeApp: React.FC = () => {
  return (
    <View className="flex-1">
      <Content />
    </View>
  );
};


const routes = [
  {
    title: "Asociacion",
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

const Content: React.FC = () => {
  return (
    <ScrollView className="flex-1 pt-20 px-4">
      <Text className="text-xl font-bold mb-4 text-center">Selecciona una opción</Text>
      <View className="flex flex-wrap flex-row justify-center gap-4">
        {routes.map((item, index) => (
          <Link key={index} href={item.route} asChild>
            <TouchableOpacity className="w-40 h-48 bg-white rounded-lg shadow-md p-2 items-center">
              <Image
                source={{ uri: item.image }}
                className="w-full h-32 rounded-md mb-2"
                resizeMode="cover"
              />
              <Text className="text-center font-semibold">{item.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};




export default HomeApp;
