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
      query: (args) => {
        const queries = Object.keys(args).reduce(
          (prev, current) =>
            args[current as keyof GetCharactersModel]
              ? `${prev}&${current}=${
                  args[current as keyof GetCharactersModel]
                }`
              : prev,
          ''
        );
        return {
          url: `/character?${queries}`,
        };
      },
    }),

    getSingleCharacter: build.query<Character, GetSingleCharacterModel>({
      query: ({ id }) => ({
        url: `/character/${id}`,
      }),
    }),
  }),
});

export const { useLazyGetCharactersQuery, useGetSingleCharacterQuery } =
  api;
