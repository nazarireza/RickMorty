import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ListMode = 'Grid' | 'List';

export type AppState = {
  isInit: boolean;
  listMode: ListMode;
};

const appInitialState: AppState = {
  isInit: false,
  listMode: 'Grid',
};

export const getConfigurations = createAsyncThunk(
  'getConfigurations',
  async () => {
    const listMode = (await AsyncStorage.getItem('listMode')) as ListMode;
    return { listMode };
  }
);

export const setConfigurations = createAction<{
  listMode: ListMode;
}>('setConfigurations');

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConfigurations.fulfilled, (state, action) => {
      state.isInit = true;
      state.listMode = action.payload.listMode;
    });

    builder.addCase(setConfigurations, (state, action) => {
      state.listMode = action.payload.listMode;
      AsyncStorage.setItem('listMode', action.payload.listMode);
    });
  },
});
