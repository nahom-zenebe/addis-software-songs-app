import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
} from './userSlice';

// Fetch logged-in user info
function* fetchUserSaga() {
  try {
    const res = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/users/me`);
    yield put(fetchUserSuccess(res.data));
  } catch (error) {
    yield put(fetchUserFailure(error.response?.data || error.message));
  }
}

// Login
function* loginSaga(action) {
  try {
    const res = yield call(axios.post, `${process.env.REACT_APP_BACKEND_URL}/auth/login`, action.payload);
    yield put(loginSuccess(res.data.user));
  } catch (error) {
    yield put(loginFailure(error.response?.data || error.message));
  }
}

// Signup
function* signupSaga(action) {
  try {
    const res = yield call(axios.post, `${process.env.REACT_APP_BACKEND_URL}/auth/signup`, action.payload);
    yield put(signupSuccess(res.data.user));
  } catch (error) {
    yield put(signupFailure(error.response?.data || error.message));
  }
}

// Logout
function* logoutSaga() {
  try {
    yield call(axios.post, `${process.env.REACT_APP_BACKEND_URL}/auth/logout`);
    // no payload needed here, clear user state in reducer
  } catch (error) {
    // optionally handle error
  }
}

export function* userSaga() {
  yield takeLatest(fetchUserRequest.type, fetchUserSaga);
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(signupRequest.type, signupSaga);
  yield takeLatest(logout.type, logoutSaga);
}
