import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, VERIFY_ACCOUNT } from '../actions/ActionTypes';
import { userLogin, userRegister, verifyUser } from './AuthSagas';
import { moviesGet } from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(REGISTER, userRegister),
    takeLatest(VERIFY_ACCOUNT, verifyUser),
    takeLatest(GET_MOVIES, moviesGet)
  ]);
}
