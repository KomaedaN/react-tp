export type NamedApiResourceDto = {
  name: string;
  url: string;
};

export type PokemonTypeDto = {
  type: NamedApiResourceDto;
};

export type PokemonDto = {
  id: number;
  name: string;
  types: PokemonTypeDto[];
};

export type PokemonListDto = {
  results: {
    name: string;
    url: string;
  }[];
};
