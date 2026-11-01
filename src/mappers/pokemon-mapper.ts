import { PokemonDto } from "@/dto/pokemon-dto";
import { Pokemon } from "@/models/pokemon";
const SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export function convertPokemonData(dto: PokemonDto): Pokemon {
  return {
    name: dto.name,
    number: dto.id,
    sprite: `${SPRITES_URL}/${dto.id}.png`,
    animatedSprite: `${SPRITES_URL}/versions/generation-v/black-white/animated/${dto.id}.gif`,
    type1: dto.types[0]?.type.name ?? "unknown",
    type2: dto.types[1]?.type.name,
    isFavorite: false,
  };
}
