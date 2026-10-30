export type Pokemon = {
  name: string;
  number: number;
  sprite: string;
  type1: string;
  type2?: string;
  isFavorite: boolean;
};

export type PokemonFilter = {
  search: string;
  type: string | null;
  onlyFavorites: boolean;
  number: number;
};

export function matchesPokemonFilter(
  pokemon: Pokemon,
  filters: PokemonFilter,
): boolean {
  const search = filters.search.trim().toLowerCase();
  const number = Number(filters.number);
  const matchesQuery =
    pokemon.name.toLocaleLowerCase().includes(search) ||
    pokemon.type1.toLocaleLowerCase().includes(search) ||
    pokemon.type2?.toLocaleLowerCase().includes(search) ||
    pokemon.number === number;

  const matchesType =
    filters.type === null ||
    pokemon.type1 === filters.type ||
    pokemon.type2 === filters.type;

  const matchesFavorite = !filters.onlyFavorites || pokemon.isFavorite;
  return matchesQuery && matchesType && matchesFavorite;
}
