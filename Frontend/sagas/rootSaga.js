import { all } from 'redux-saga/effects';
import { songSaga } from '../features/songs/songSaga';
import { albumSaga } from '../features/songs/albumsaga';
import { reviewSaga} from '../features/songs/Reviewsaga';
import { userSaga } from '../features/songs/usersaga';

export default function* rootSaga() {
  yield all([
    songSaga(),
    albumSaga(),
    reviewSaga(),
    userSaga()
  ]);
}
