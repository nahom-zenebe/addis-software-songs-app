import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  createAlbumRequest,
  createAlbumSuccess,
  createAlbumFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  fetchAlbumByIdRequest,
  fetchAlbumByIdSuccess,
  fetchAlbumByIdFailure,
  updateAlbumRequest,
  updateAlbumSuccess,
  updateAlbumFailure,
  deleteAlbumRequest,
  deleteAlbumSuccess,
  deleteAlbumFailure,
} from './albumslice';

function* fetchAlbumsSaga() {
  try {
    const res = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/albums`);
    yield put(fetchAlbumsSuccess(res.data));
  } catch (error) {
    yield put(fetchAlbumsFailure(error.response?.data || error.message));
  }
}

function* fetchAlbumByIdSaga(action) {
  try {
    const res = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/albums/${action.payload}`);
    yield put(fetchAlbumByIdSuccess(res.data));
  } catch (error) {
    yield put(fetchAlbumByIdFailure(error.response?.data || error.message));
  }
}

function* createAlbumSaga(action) {
  try {
    const res = yield call(axios.post, `${process.env.REACT_APP_BACKEND_URL}/albums`, action.payload);
    yield put(createAlbumSuccess(res.data));
  } catch (error) {
    yield put(createAlbumFailure(error.response?.data || error.message));
  }
}

function* updateAlbumSaga(action) {
  try {
    const { id, albumData } = action.payload;
    const res = yield call(axios.put, `${process.env.REACT_APP_BACKEND_URL}/albums/${id}`, albumData);
    yield put(updateAlbumSuccess(res.data));
  } catch (error) {
    yield put(updateAlbumFailure(error.response?.data || error.message));
  }
}

function* deleteAlbumSaga(action) {
  try {
    const id = action.payload;
    yield call(axios.delete, `${process.env.REACT_APP_BACKEND_URL}/albums/${id}`);
    yield put(deleteAlbumSuccess(id));
  } catch (error) {
    yield put(deleteAlbumFailure(error.response?.data || error.message));
  }
}

export function* albumSaga() {
  yield takeLatest(fetchAlbumsRequest.type, fetchAlbumsSaga);
  yield takeLatest(fetchAlbumByIdRequest.type, fetchAlbumByIdSaga);
  yield takeLatest(createAlbumRequest.type, createAlbumSaga);
  yield takeLatest(updateAlbumRequest.type, updateAlbumSaga);
  yield takeLatest(deleteAlbumRequest.type, deleteAlbumSaga);
}
