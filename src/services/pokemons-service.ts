import { Pokemon } from "@/models/pokemon";

export async function fetchPokemons() {
  const PokeApi = process.env.EXPO_PUBLIC_POKEMON_API;
  console.log(PokeApi);

  if (!PokeApi) {
    throw new Error("L'API n'est pas valide");
  }
  const response = await fetch(PokeApi);

  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

  return response.json() as Promise<Pokemon[]>;
}
