import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  switchDarkTheme: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSwitchDarkTheme: (state, action) => {
      state.switchDarkTheme = action.payload;
    },
    loadStoredTheme: (state, action) => {
      state.switchDarkTheme = action.payload;
    },
  },
});

export const {setSwitchDarkTheme, loadStoredTheme} = themeSlice.actions;
export default themeSlice.reducer;
