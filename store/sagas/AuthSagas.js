import { call, put } from "redux-saga/effects";

import { authUser, loginError, registerError } from "../actions/AuthActions";
import AuthService from "../../services/AuthService";
import NavigationService from "../../services/NavigationService";

export function* userLogin({ payload }) {
  try {
    yield call(AuthService.login, payload);

    yield put(authUser(true));
    yield call(NavigationService.navigate, "AuthLoading");
  } catch (error) {
    yield put(loginError(true));
  }
}

export function* userRegister({ payload }) {
  try {
    yield call(AuthService.signup, payload);

    yield call(AuthService.login, payload);
    yield put(authUser(true));
    yield call(NavigationService.navigate, "AuthLoading");
  } catch (error) {
    yield put(registerError(true));
  }
}
