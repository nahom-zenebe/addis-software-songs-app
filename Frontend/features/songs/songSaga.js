import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './songsSlice';

function* fetchSongsSaga() {
  try {
    const res = yield call(axios.get, `${process.env.Backend_Url}/songs/getsongs`, {
      withCredentials: true,
    });
    yield put(fetchSongsSuccess(res.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.response?.data || error.message));
  }
}

function* createSongSaga(action) {
  try {
    const res = yield call(
      axios.post,
      `${process.env.Backend_Url}/songs/createsongs`,
      action.payload,
      { withCredentials: true }
    );
    yield put(createSongSuccess(res.data));
  } catch (error) {
    yield put(createSongFailure(error.response?.data || error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const { id, songData } = action.payload;
    const res = yield call(
      axios.put,
      `${process.env.Backend_Url}/songs/updatesongs/${id}`,
      songData,
      { withCredentials: true }
    );
    yield put(updateSongSuccess(res.data));
  } catch (error) {
    yield put(updateSongFailure(error.response?.data || error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(
      axios.delete,
      `${process.env.Backend_Url}/songs/deletesongs/${action.payload}`,
      { withCredentials: true }
    );
    yield put(deleteSongSuccess(action.payload));
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
