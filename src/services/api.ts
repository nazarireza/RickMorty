import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';
import {
  Character,
  GetCharactersDto,
  GetCharactersModel,
  GetSingleCharacterModel,
} from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.manifest?.extra?.baseUrl,
  }),
  endpoints: (build) => ({
    getCharacters: build.query<GetCharactersDto, GetCharactersModel>({
      query: ({ name, page = 1, status = 'Alive' }) => ({
        url: `/character?name=${name}&status=${status}&page=${page}`,
      }),
    }),

    getSingleCharacter: build.query<Character, GetSingleCharacterModel>({
      query: ({ id }) => ({
        url: `/character/${id}`,
      }),
    }),
  }),
});

export const { useLazyGetCharactersQuery, useLazyGetSingleCharacterQuery } =
  api;
