import { Pokemon } from "@/models/pokemon";
import { fetchPokemons } from "@/services/pokemons-service";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon>();
  useEffect(() => {
    fetchPokemons(717)
      .then((data) => {
        setPokemons(data);
      })
      .catch((error) => console.error("Erreur lors du chargement :", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{pokemons ? `Bonjour ${pokemons.name}` : "test"}</Text>
      <Image
        style={styles.sprite}
        source={{ uri: pokemons?.animatedSprite ?? pokemons?.sprite }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sprite: {
    width: 120,
    height: 120,
  },
});
