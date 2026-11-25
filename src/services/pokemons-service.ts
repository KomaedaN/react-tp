import { PokemonDto } from "@/dto/pokemon-dto";
import { convertPokemonData } from "@/mappers/pokemon-mapper";

export async function fetchPokemons(id: number) {
  const pokeApiUrl = process.env.EXPO_PUBLIC_POKEMON_API;

  if (!pokeApiUrl) {
    throw new Error("L'API n'est pas valide");
  }
  const response = await fetch(`${pokeApiUrl}/${id}`);

  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  const data: PokemonDto = await response.json();
  return convertPokemonData(data);
}
