import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { getRangePokemonFromAPI } from "@/services/pokeapi-service";
import { useEffect, useState } from "react";
import { Pokemon } from "@/models/pokemon-api";
import { TypeBadge } from "@/components/type-badge";

const PAR_PAGE = 21;

export default function Pokedex() {
  const totalPages = 48;
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [inputPage, setInputPage] = useState("1");

  function selectPageNumber(selectNumber: number) {
    const nextPage = Number.isNaN(selectNumber)
      ? page
      : Math.min(Math.max(selectNumber, 1), totalPages);
    setPage(nextPage);
    setInputPage(String(nextPage));
  }

  useEffect(() => {
    setInputPage(String(page));
    const startId = (page - 1) * PAR_PAGE + 1;
    getRangePokemonFromAPI(PAR_PAGE, startId).then((data) => {
      setPokemons(data);
    });
  }, [page]);
  return (
    <View style={styles.page}>
      <FlatList
        data={pokemons}
        numColumns={3}
        keyExtractor={(pokemon) => String(pokemon.number)}
        renderItem={({ item }) => (
          <View style={styles.cellule}>
            <View style={styles.card}>
              <Image
                style={styles.sprite}
                source={{ uri: item.animatedSprite ?? item.sprite }}
              />
              <Text>#{item.number}</Text>
              <View style={styles.types}>
                <TypeBadge type={item.type1} />
                {item.type2 && <TypeBadge type={item.type2} />}
              </View>
              <Text numberOfLines={1}>{item.name}</Text>
            </View>
          </View>
        )}
      />
      <Link href="/">Accueil</Link>
      <View style={styles.pagination}>
        <Button
          title="Précédent"
          onPress={() => setPage(page - 1)}
          disabled={page === 1}
        />
        <View style={styles.selecteur}>
          <Text>Page</Text>
          <TextInput
            style={styles.input}
            value={inputPage}
            onChangeText={setInputPage}
            onSubmitEditing={() => selectPageNumber(parseInt(inputPage, 10))}
            keyboardType="number-pad"
            returnKeyType="done"
            selectTextOnFocus
            maxLength={3}
          />
          <Text>{`/ ${totalPages}`}</Text>
          <Button
            title="OK"
            onPress={() => selectPageNumber(parseInt(inputPage, 10))}
          />
        </View>
        <Button
          title="Suivant"
          onPress={() => setPage(page + 1)}
          disabled={page === totalPages}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 16 },
  ligne: { flexDirection: "row", alignItems: "center", gap: 12 },
  sprite: { width: 64, height: 64, resizeMode: "contain" },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cellule: {
    width: "33.33%",
    padding: 4,
  },
  card: {
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  selecteur: { flexDirection: "row", alignItems: "center", gap: 6 },
  input: {
    minWidth: 48,
    padding: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
  },
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    marginVertical: 4,
  },
});
