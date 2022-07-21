export type CharacterStatus = '' | 'Alive' | 'Dead' | 'unknown';

type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

type CharacterOrigin = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterOrigin;
  location: CharacterGender;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type GetCharactersDto = {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: Character[];
};

export type GetCharactersModel = {
  page: number;
  name: string;
  status: CharacterStatus;
};

export type GetSingleCharacterModel = {
  id: number;
};
