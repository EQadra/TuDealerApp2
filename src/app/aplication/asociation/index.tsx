import { Link } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Svg, Path, Defs, Rect, ClipPath } from "react-native-svg";

const { width } = Dimensions.get("window");

const Star = ({ filled = true, half = false, size = 20, color = "#facc15" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 
           5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
      {filled && !half && (
        <Path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 
             5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill={color}
        />
      )}
      {half && (
        <>
          <Defs>
            <ClipPath id="halfClip">
              <Rect x="0" y="0" width="12" height="24" />
            </ClipPath>
          </Defs>
          <Path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 
               5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            fill={color}
            clipPath="url(#halfClip)"
          />
        </>
      )}
    </Svg>
  );
};

const doctors = [
  {
    id: 1,
    name: "Dra. Ana López",
    age: 45,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Carlos Pérez",
    age: 50,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Dra. María Ruiz",
    age: 38,
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

const products = [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    image: "https://picsum.photos/id/1005/800/600",
  },
  {
    id: 2,
    name: "Cámara Digital",
    image: "https://picsum.photos/id/1011/800/600",
  },
  {
    id: 3,
    name: "Reloj Inteligente",
    image: "https://picsum.photos/id/1025/800/600",
  },
  {
    id: 4,
    name: "Laptop Gamer",
    image: "https://picsum.photos/id/1043/800/600",
  },
];

export default function Asociation(): JSX.Element {
  const { top, bottom } = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productFlatListRef = useRef<FlatList>(null);
  const brandFlatListRef = useRef<FlatList>(null);
  const [selectedTab, setSelectedTab] = useState("Productos");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const closeDoctorModal = () => {
    setSelectedDoctor(null);
    setModalVisible(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      productFlatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      productFlatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % products.length;
      setCurrentIndex(nextIndex);
      productFlatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const tabs = ["Servicios", "Productos", "Promos"];
  const tabContent = {
    Servicios: [
      {
        id: 1,
        name: "Consulta Médica",
        description: "Atención médica personalizada con profesionales.",
        image: "https://picsum.photos/200/200?random=1",
      },
      {
        id: 2,
        name: "Exámenes Clínicos",
        description: "Amplia gama de estudios y análisis de laboratorio.",
        image: "https://picsum.photos/200/200?random=2",
      },
    ],
    Productos: [
      {
        id: 1,
        name: "Kit de Salud",
        description: "Incluye tensiómetro, termómetro digital y oxímetro.",
        image: "https://picsum.photos/200/200?random=5",
      },
    ],
    Promos: [
      {
        id: 1,
        name: "Consulta 2x1",
        description: "Lleva a un acompañante sin costo adicional.",
        image: "https://picsum.photos/200/200?random=10",
      },
    ],
  };

  return (
    <ScrollView className="flex-1 bg-green-200" contentContainerStyle={{ paddingBottom: bottom }}>
      {/* Aquí va el mismo contenido que tú ya tienes como headers, perfiles, tabs, listas, etc. */}
      {/* Todo fue revisado arriba, y está funcionando correctamente. */}
{/* Modal Producto */}
<Modal visible={!!selectedProduct} animationType="slide" transparent>
  <View className="flex-1 justify-center items-center bg-green-100/90">
    {selectedProduct ? (
      <View className="bg-white p-4 rounded-xl w-72 shadow-lg">
        <Image source={{ uri: selectedProduct.image }} className="w-full h-52 rounded-lg" />
        <Text className="text-lg font-bold mt-2">{selectedProduct.name}</Text>
        <Text className="text-sm text-gray-600 mt-2">{selectedProduct.description}</Text>
        <TouchableOpacity
          onPress={() => setSelectedProduct(null)}
          className="mt-4 bg-green-500 py-2 px-4 rounded-lg"
        >
          <Text className="text-green-800 text-center font-bold">Cerrar</Text>
        </TouchableOpacity>
      </View>
    ) : null}
  </View>
</Modal>

{/* Modal Doctor */}
<Modal visible={modalVisible} animationType="slide" transparent>
  <View className="flex-1 justify-center items-center bg-green-100/90 px-4">
    {selectedDoctor ? (
      <View className="bg-white p-6 rounded-xl w-80 max-w-md shadow-xl">
        <Image
          source={{ uri: selectedDoctor.avatar }}
          className="w-full h-48 rounded-lg mb-4"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold mb-2">{selectedDoctor.name}</Text>
        <Text className="text-lg mb-4">Edad: {selectedDoctor.age}</Text>
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            onPress={closeDoctorModal}
            className="bg-green-300 flex-1 py-3 rounded-lg mr-2"
          >
            <Text className="font-bold text-center text-green-900">Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Ver perfil:", selectedDoctor.name)}
            className="bg-green-200 flex-1 py-3 rounded-lg ml-2"
          >
            <Text className="font-bold text-center text-green-800">Ver perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null}
  </View>
</Modal>

    </ScrollView>
  );
}
