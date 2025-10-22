import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  role: 'athlete' | 'gymOwner' | 'coach' | null;
  user: any;
  profile: any;
  profileLoading: boolean;
}

const initialState: UserState = {
  role: null,
  user: null,
  profile: null,
  profileLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (
      state,
      action: PayloadAction<'athlete' | 'gymOwner' | 'coach'>,
    ) => {
      state.role = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload;
    },
    clearRole: state => {
      state.role = null;
    },
  },
});

export const {setRole, clearRole, setUser, setProfile, setProfileLoading} =
  userSlice.actions;
export default userSlice.reducer;
