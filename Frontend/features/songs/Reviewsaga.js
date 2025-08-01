import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure,
} from './Reviewslice';

function* fetchReviewsSaga() {
  try {
    const res = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/reviews`);
    yield put(fetchReviewsSuccess(res.data));
  } catch (error) {
    yield put(fetchReviewsFailure(error.response?.data || error.message));
  }
}

function* createReviewSaga(action) {
  try {
    const res = yield call(axios.post, `${process.env.REACT_APP_BACKEND_URL}/reviews`, action.payload);
    yield put(createReviewSuccess(res.data));
  } catch (error) {
    yield put(createReviewFailure(error.response?.data || error.message));
  }
}

function* deleteReviewSaga(action) {
  try {
    const id = action.payload;
    yield call(axios.delete, `${process.env.REACT_APP_BACKEND_URL}/reviews/${id}`);
    yield put(deleteReviewSuccess(id));
  } catch (error) {
    yield put(deleteReviewFailure(error.response?.data || error.message));
  }
}

export function* reviewSaga() {
  yield takeLatest(fetchReviewsRequest.type, fetchReviewsSaga);
  yield takeLatest(createReviewRequest.type, createReviewSaga);
  yield takeLatest(deleteReviewRequest.type, deleteReviewSaga);
}
