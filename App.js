import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text,FlatList, StyleSheet, Image } from "react-native";

export default function App() {

  const [characters, setCharacters] = useState([]);

  async function fetchCharacters() {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );

      setCharacters(response.data.results);
      console.log(response.data.results);

    } catch (error) {
      console.log("Erro ao buscar personagens");
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personagens Rick and Morty</Text>

      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <Text style={styles.name}>{item.name}</Text>

            <Text>Espécie: {item.species}</Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status === "Alive"
                      ? "green"
                      : item.status === "Dead"
                      ? "red"
                      : "gray",
                },
              ]}
            >
              Status: {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#DDD",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});