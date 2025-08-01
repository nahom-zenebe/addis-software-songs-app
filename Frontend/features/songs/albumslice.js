import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedAlbum: null, // for detailed album view
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    fetchAlbumsRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchAlbumsSuccess(state, action) {
      state.status = 'succeeded';
      state.albums = action.payload;
    },
    fetchAlbumsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    fetchAlbumByIdRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchAlbumByIdSuccess(state, action) {
      state.status = 'succeeded';
      state.selectedAlbum = action.payload;
    },
    fetchAlbumByIdFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    createAlbumRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    createAlbumSuccess(state, action) {
      state.status = 'succeeded';
      state.albums.unshift(action.payload);
    },
    createAlbumFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    updateAlbumRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    updateAlbumSuccess(state, action) {
      state.status = 'succeeded';
      const index = state.albums.findIndex(album => album._id === action.payload._id);
      if (index !== -1) state.albums[index] = action.payload;
      if (state.selectedAlbum && state.selectedAlbum._id === action.payload._id) {
        state.selectedAlbum = action.payload;
      }
    },
    updateAlbumFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    deleteAlbumRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    deleteAlbumSuccess(state, action) {
      state.status = 'succeeded';
      state.albums = state.albums.filter(album => album._id !== action.payload);
      if (state.selectedAlbum && state.selectedAlbum._id === action.payload) {
        state.selectedAlbum = null;
      }
    },
    deleteAlbumFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
    resetStatus(state) {
      state.status = 'idle';
    },
  }
});

export const {
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  fetchAlbumByIdRequest,
  fetchAlbumByIdSuccess,
  fetchAlbumByIdFailure,
  createAlbumRequest,
  createAlbumSuccess,
  createAlbumFailure,
  updateAlbumRequest,
  updateAlbumSuccess,
  updateAlbumFailure,
  deleteAlbumRequest,
  deleteAlbumSuccess,
  deleteAlbumFailure,
  clearError,
  resetStatus
} = albumSlice.actions;

export default albumSlice.reducer;
