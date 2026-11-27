import { PokemonDto } from "@/models/pokemon-api";
import { Pokemon } from "@/models/pokemon-api";

const API_URL = process.env.EXPO_PUBLIC_POKEMON_API;
const SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export function convertPokemonData(dto: PokemonDto): Pokemon {
  return {
    name: dto.name,
    number: dto.id,
    sprite: `${SPRITES_URL}/${dto.id}.png`,
    animatedSprite:
      dto.id <= 649
        ? `${SPRITES_URL}/versions/generation-v/black-white/animated/${dto.id}.gif`
        : undefined,
    type1: dto.types[0]?.type.name ?? "unknown",
    type2: dto.types[1]?.type.name,
    isFavorite: false,
  };
}

export async function fetchPokemon(id: number) {
  const pokeApiUrl = process.env.EXPO_PUBLIC_POKEMON_API;

  if (!pokeApiUrl) {
    throw new Error("L'API n'est pas valide");
  }
  const response = await fetch(`${pokeApiUrl}/${id}`);

  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  const data: PokemonDto = await response.json();
  return convertPokemonData(data);
}

export function getRangePokemonFromAPI(range: number, startId: number) {
  const pokemons: Promise<Pokemon>[] = [];
  for (let i = 0; i < range; i++) {
    const pokemon = fetchPokemon(startId + i);
    pokemons.push(pokemon);
  }
  return Promise.all(pokemons);
}
