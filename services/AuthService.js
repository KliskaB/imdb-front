import { AsyncStorage } from "react-native";
import ApiService from "./ApiService";
import config from "../config";
import SignUp from "../screens/auth/SignUp";

const ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/users/register/",
  LOGOUT: "/logout",
  VERIFY: "/api/users/verify",
  GET_ME: "/api/users/me/",
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    this.setAuthorizationHeader();
  };

  setAuthorizationHeader = async () => {
    const token = await this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    this.api.attachHeaders({
      clientId: config.CLIENT_ID,
    });
  };

  createSession = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await this.setAuthorizationHeader();
  };

  setSignedUp = async (flag) => {
    await AsyncStorage.setItem("isSignedUp", JSON.stringify(flag));
  };

  getIsSignedUp = async () => {
    const value = await AsyncStorage.getItem('isSignedUp');
    return value !== null && value !== undefined && JSON.parse(value);
  }

  destroySession = async () => {
    await AsyncStorage.clear();
    this.api.removeHeaders(["Authorization"]);
  };

  login = async (loginData) => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);
    await this.createSession(data);
    return data;
  };

  logout = async () => {
    //const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    await this.destroySession();
    return { ok: true, data };
  };

  signup = async (signupData) => {
    let formdata = new FormData();
    if(signupData.profile_picture) {
      let photo = { uri: signupData.profile_picture.uri}
      formdata.append("profile_picture", {uri: photo.uri, name: signupData.username + '.jpg', type: 'image/jpg'});
    } else { 
      formdata.append("profile_picture", "");
    }
    formdata.append("email", signupData.email);
    formdata.append("password", signupData.password);
    formdata.append("username", signupData.username);
    const response = await this.apiClient.post(ENDPOINTS.REGISTER, formdata);
    return response.data;
  };

  verify = async (payload) => {
    const { data } = await this.apiClient.post(ENDPOINTS.VERIFY, payload);
    return data;
  };

  getMe = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_ME);
    return data;
  }

  setIsVerified = async (flag) => {
    await AsyncStorage.setItem("isVerified", JSON.stringify(flag));
  };

  getIsVerified = async () => {
    const value = await AsyncStorage.getItem('isVerified');
    return value !== null && value !== undefined && JSON.parse(value);
  }

  getToken = async () => {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user).access : undefined;
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  };
}

const authService = new AuthService();
export default authService;
