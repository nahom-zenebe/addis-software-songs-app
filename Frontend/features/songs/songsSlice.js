import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
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
      state.items = action.payload.data || [];
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload.currentPage || 1,
        totalPages: action.payload.totalPages || 1,
        totalItems: action.payload.totalItems || 0,
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

  setPagination,
  resetSongsState,
} = songsSlice.actions;

export default songsSlice.reducer;
