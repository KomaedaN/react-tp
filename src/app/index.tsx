import { Pokemon } from "@/models/pokemon-api";
import { fetchPokemon } from "@/services/pokeapi-service";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image, Button } from "react-native";
import { Link } from "expo-router";
import { addCapturedPokemon } from "@/services/pokemon-db-service";
import { auth } from "@/services/firebase";
import { signInAnonymously } from "firebase/auth";

async function testAdd() {
  try {
    const { user } = await signInAnonymously(auth);
    await addCapturedPokemon(user.uid, 717, "YVELATL");
    console.log("Ajouté pour", user.uid);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon>();
  useEffect(() => {
    fetchPokemon(717)
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
      <Button title="Capturer" onPress={testAdd} />
      <Link href="/pokedex">Pokedex</Link>
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
