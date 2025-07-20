import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 4, // changed from 10 to 4
  },
  status: 'idle',
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    
    fetchSongsRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
  
    fetchSongsSuccess(state, action) {
      state.status = 'succeeded';
      state.items = action.payload.items || [];
      state.pagination = {
        ...state.pagination,
        ...action.payload.pagination,
      };
    },
    fetchSongsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    createSongRequest() {},
    createSongSuccess(state, action) {
      state.items.unshift(action.payload);
      state.pagination.totalItems += 1;
    },
    createSongFailure(state, action) {
      state.error = action.payload;
    },

    updateSongRequest() {},
    updateSongSuccess(state, action) {
      const index = state.items.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    updateSongFailure(state, action) {
      state.error = action.payload;
    },

    deleteSongRequest() {},
    deleteSongSuccess(state, action) {
      state.items = state.items.filter(song => song.id !== action.payload);
      state.pagination.totalItems -= 1;
    },
    deleteSongFailure(state, action) {
      state.error = action.payload;
    },
    toggleFavoriteRequest() {},
    toggleFavoriteSuccess(state, action) {
      const song = state.items.find(
        song => String(song.id) === String(action.payload.id)
      );
      if (song) {
        song.favorite = action.payload.favorite;
      }
    },
    toggleFavoriteFailure(state, action) {
      state.error = action.payload;
    },

    setPagination(state, action) {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },

    resetSongsState() {
      return initialState;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,

  createSongRequest,
  createSongSuccess,
  createSongFailure,

  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,

  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  toggleFavoriteRequest,
  toggleFavoriteSuccess,
  toggleFavoriteFailure,

  setPagination,
  resetSongsState,


} = songsSlice.actions;

export default songsSlice.reducer;
