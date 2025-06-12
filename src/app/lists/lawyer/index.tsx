import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  UIManager,
  findNodeHandle,
} from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const router = useRouter();

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Badge {
  id: number;
  label: string;
  image: string;
}

const Page: React.FC = () => {
  return (
<View className="flex flex-1 bg-white dark:bg-black">
      <Content />
    </View>
  );
};

const Content: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const iconRefs = useRef<(TouchableOpacity | null)[]>([]);

  const items = [
    { label: "ver detalle", route: "aplication/lawyer" },
    { label: "wsp personal" },
    { label: "formulario" },
  ];
  
  const news: NewsItem[] = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    title: `Noticia ${i + 1}`,
    description: "Breve descripción de la noticia.",
    image: `https://picsum.photos/400/300?random=${i}`,
  }));

  const badges: Badge[] = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    label: `Categoría ${i + 1}`,
    image: `https://picsum.photos/100/100?random=${i + 10}`,
  }));

  const carouselImages: NewsItem[] = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    title: `Imagen ${i + 1}`,
    description: "Descripción",
    image: `https://picsum.photos/300/200?random=${i + 20}`,
  }));

  const openDropdown = (index: number, badgeId: number) => {
    const handle = findNodeHandle(iconRefs.current[index]);
    if (handle) {
      UIManager.measure(handle, (_x, _y, _width, height, pageX, pageY) => {
        const screenWidth = Dimensions.get("window").width;
        const dropdownWidth = 160;

        const left = pageX - dropdownWidth > 0 ? pageX - dropdownWidth : pageX;
        setMenuPosition({ x: left, y: pageY + height });
        setModalVisible(badgeId);
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
     
      
      {/* Categorías */}
      <View className="px-4 mb-2">
        <Text className="text-2xl font-bold mb-4 dark:text-white">
          Categorías
        </Text>
        {badges.map((badge, index) => (
          <View
            key={badge.id}
            className="flex-row items-center mb-4 justify-between"
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: badge.image }}
                className="h-12 w-12 rounded-full mr-4"
              />
              <Text className="text-lg dark:text-white">{badge.label}</Text>
            </View>
            <TouchableOpacity
              ref={(ref) => (iconRefs.current[index] = ref)}
              onPress={() => openDropdown(index, badge.id)}
            >
              <Text className="text-2xl dark:text-white">⋮</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Modal Dropdown */}
        {modalVisible !== null && (
          <Modal
            visible={true}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(null)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={() => setModalVisible(null)}
            >
              <View
                style={[
                  styles.dropdownMenu,
                  {
                    position: "absolute",
                    top: menuPosition.y,
                    left: menuPosition.x,
                  },
                ]}
              >
               // En el render del Modal:
                  {items.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        if (option.route) {
                          router.push(option.route);
                        } else {
                          console.log(
                            `Seleccionaste ${option.label} para categoría ${modalVisible}`
                          );
                        }
                        setModalVisible(null);
                      }}
                    >
                      <Text style={styles.dropdownText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>

       {/* Bienvenida */}
       <View className="py-6 px-4">
        <View className="flex items-center text-center">
          <Link
            href="/"
            className="mt-4 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md"
          >
            Explorar
          </Link>
        </View>
      </View>


      {/* Últimas Noticias */}
      <View className="px-4 mb-8">
        <Text className="text-2xl font-bold mb-4 dark:text-white text-center">
          Últimas Noticias
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {news.map((item) => (
            <View
              key={item.id}
              className="w-[48%] mb-4 rounded-lg overflow-hidden shadow bg-white dark:bg-gray-800"
            >
              <Image source={{ uri: item.image }} className="h-32 w-full" />
              <View className="p-2">
                <Text className="text-lg font-semibold dark:text-white">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-300">
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View className="items-center mt-4">
          <TouchableOpacity className="bg-black py-2 px-4 rounded-md">
            <Text className="text-white text-sm font-semibold">
              Ver más noticias
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Carrusel */}
      <View className="px-4 mb-12">
        <Text className="text-2xl font-bold mb-4 dark:text-white">
          Galería de Noticias
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {carouselImages.map((item) => (
            <View
              key={item.id}
              className="w-[250px] mr-4 rounded-xl overflow-hidden shadow bg-white dark:bg-gray-800"
            >
              <Image
                source={{ uri: item.image }}
                className="h-32 w-full"
                resizeMode="cover"
              />
              <View className="p-2">
                <Text className="text-lg font-semibold dark:text-white">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-300">
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {/*  */}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    minWidth: 160,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Page;
