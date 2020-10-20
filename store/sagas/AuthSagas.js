import { call, put } from "redux-saga/effects";

import { authUser, loginError, registerError } from "../actions/AuthActions";
import AuthService from "../../services/AuthService";
import NavigationService from "../../services/NavigationService";

export function* userLogin({ payload }) {
  try {
    yield call(AuthService.login, payload);
    yield put(authUser(true));
    const data = yield call(AuthService.getMe);
    yield call(AuthService.setIsVerified, data.is_verified);
    yield call(NavigationService.navigate, "AuthLoading");
  } catch (error) {
    yield put(loginError(true));
  }
}

export function* userRegister({ payload }) {
  try {
    yield call(AuthService.signup, payload);
    yield call(AuthService.setSignedUp, true);
    yield call(AuthService.login, payload);
    yield put(authUser(true));
    yield call(AuthService.setIsVerified, false);
    yield call(NavigationService.navigate, "VerifyStack");
  } catch (error) {
    yield put(registerError(true));
  }
}

export function* verifyUser({ payload }) {
  try {
    const isVerified = yield call(AuthService.verify, payload);
    yield call(AuthService.setIsVerified, isVerified);
    yield call(NavigationService.navigate, "MainStack");
  } catch (error) {
    console.log(error)
  }
}
