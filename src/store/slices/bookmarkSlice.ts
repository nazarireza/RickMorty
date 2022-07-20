import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character } from '../../services/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BookmarkState = {
  items: Character[];
};

const initialState = {
  items: [],
} as BookmarkState;

export const bookmark = createAction<Character>('bookmark');
export const unBookmark = createAction<Character>('unBookmark');

export const getBookmarks = createAsyncThunk('getBookmarks', async () => {
  const bookmarksString = await AsyncStorage.getItem('bookmarks');
  return (bookmarksString ? JSON.parse(bookmarksString) : []) as Character[];
});

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookmark, (state, action) => {
      state.items = [action.payload, ...state.items];
      AsyncStorage.setItem('bookmarks', JSON.stringify(state.items));
    });

    builder.addCase(unBookmark, (state, action) => {
      state.items = [...state.items.filter((p) => p.id !== action.payload.id)];
      AsyncStorage.setItem('bookmarks', JSON.stringify(state.items));
    });

    builder.addCase(getBookmarks.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
