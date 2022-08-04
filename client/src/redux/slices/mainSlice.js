import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchGetPeople = createAsyncThunk('users/getAll', async () => {
  const { data } = await axios.get('/people');
  return data;
})

export const fetchRegister = createAsyncThunk('user/register', async (params, thunkAPI) => {
  const { data } = await axios.post('/auth/register', params);
  thunkAPI.dispatch(setName(data.name))
  return data;
});

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params, thunkAPI) => {
  const { data } = await axios.post('/auth/login', params);
  thunkAPI.dispatch(setName(data.name))
  return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
})

export const fetchUpdateInfo = createAsyncThunk('user/updateInfo', async (user, thunkAPI) => {
  const { data } = await axios.patch(`/update/${user._id}`, user);
  thunkAPI.dispatch(setName(data.name))
  return data;
})

export const initialState = {
  users: [],
  isLogin: false,
  data: null,
  status: 'loading',
}

const mainSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.username = '';
    },
    setName: (state, action) => {
      state.username = action.payload;
    },
    showLoginForm: (state) => {
      state.isLogin = true;
    },
    showRegForm: (state) => {
      state.isLogin = false;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchGetPeople.pending]: (state) => {
      state.status = 'loading';
      state.users = null;
    },
    [fetchGetPeople.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.users = action.payload;
    },
    [fetchGetPeople.rejected]: (state) => {
      state.status = 'error';
      state.users = null;
    },
  }
})


export const selectIsAuth = state => Boolean(state.mainReducer.data);

export const mainReducer = mainSlice.reducer;

export const { logout, setName, showLoginForm, showRegForm } = mainSlice.actions;