import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  creaFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from './songsSlice';

function* fetchSongsSaga() {
  try {
    const res = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/songs`);
    yield put(fetchSongsSuccess(res.data)); 
  } catch (error) {
    yield put(fetchSongsFailure(error.response?.data || error.message));
  }
}

function* createSongSaga(action) {
  try {
    const res = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/songs`,
      action.payload
    );
    const newSong = res.data[res.data.length - 1];
    yield put(createSongSuccess(newSong));
  } catch (error) {
    yield put(createSongFailure(error.response?.data || error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const { id, songData } = action.payload;
    yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/songs/${id}`,
      songData
    );
    yield put(updateSongSuccess({ id, songData }));
  } catch (error) {
    yield put(updateSongFailure(error.response?.data || error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    const id = action.payload;
    yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/songs/${id}`
    );
    yield put(deleteSongSuccess(id));
  } catch (error) {
    yield put(deleteSongFailure(error.response?.data || error.message));
  }
}

export function* songSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(createSongRequest.type, createSongSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
