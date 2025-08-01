import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  status: 'idle',
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    fetchReviewsRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchReviewsSuccess(state, action) {
      state.status = 'succeeded';
      state.reviews = action.payload;
    },
    fetchReviewsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    createReviewRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    createReviewSuccess(state, action) {
      state.status = 'succeeded';
      state.reviews.unshift(action.payload);
    },
    createReviewFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    updateReviewRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    updateReviewSuccess(state, action) {
      state.status = 'succeeded';
      const index = state.reviews.findIndex(r => r._id === action.payload._id);
      if (index !== -1) state.reviews[index] = action.payload;
    },
    updateReviewFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    deleteReviewRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    deleteReviewSuccess(state, action) {
      state.status = 'succeeded';
      state.reviews = state.reviews.filter(r => r._id !== action.payload);
    },
    deleteReviewFailure(state, action) {
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
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  updateReviewRequest,
  updateReviewSuccess,
  updateReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure,
  clearError,
  resetStatus
} = reviewSlice.actions;

export default reviewSlice.reducer;
